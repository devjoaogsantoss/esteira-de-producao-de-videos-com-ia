import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';
import sharp from 'sharp';
const file=process.argv[2]??'entrega/SerieB2026-PREVIA-sem-narracao.mp4';
if(!fs.existsSync(file))throw new Error(`Ausente: ${file}`);
const probeResult=spawnSync(probe.path,['-v','quiet','-show_format','-show_streams','-of','json',file],{encoding:'utf8'});
const meta=JSON.parse(probeResult.stdout);const v=meta.streams.find(s=>s.codec_type==='video');
if(v.width!==1080||v.height!==1920||v.avg_frame_rate!=='30/1'||Number(meta.format.duration)>50.05||v.codec_name!=='h264')throw new Error('Formato fora do briefing.');
const decode=spawnSync(ffmpeg,['-v','error','-i',file,'-f','null','-'],{encoding:'utf8'});
if(decode.status!==0||decode.stderr.trim())throw new Error(`Falha na decodificação: ${decode.stderr}`);
const audio=spawnSync(ffmpeg,['-hide_banner','-i',file,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-'],{encoding:'utf8'});
const loudness=audio.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0];
const thumbs=[];
for(let second=0;second<Number(meta.format.duration);second++){
 const out=`review/export-${second}.jpg`;
 const r=spawnSync(ffmpeg,['-v','error','-y','-ss',String(second),'-i',file,'-frames:v','1','-vf','scale=180:320',out]);
 if(r.status!==0)throw new Error(`Não foi possível extrair segundo ${second}`);
 thumbs.push({input:out,left:(second%10)*180,top:Math.floor(second/10)*320});
}
await sharp({create:{width:1800,height:Math.ceil(thumbs.length/10)*320,channels:3,background:'#020c1f'}}).composite(thumbs).jpeg().toFile('review/export-contact-sheet.jpg');
fs.writeFileSync('entrega/VERIFICACAO.json',JSON.stringify({file,width:v.width,height:v.height,fps:v.avg_frame_rate,codec:v.codec_name,pixelFormat:v.pix_fmt,duration:Number(meta.format.duration),frames:Number(v.nb_frames),audio:meta.streams.filter(s=>s.codec_type==='audio').map(s=>({codec:s.codec_name,sampleRate:s.sample_rate,channels:s.channels})),decodedWithoutErrors:true,loudness:loudness?JSON.parse(loudness):null,narrationPresent:!file.includes('PREVIA'),listeningReview:false,note:file.includes('PREVIA')?'Prévia sem narração.':'Final com locução fornecida e trilha mixada. Revisão visual e técnica; escuta subjetiva não disponível neste ambiente.'},null,2));
console.log(fs.readFileSync('entrega/VERIFICACAO.json','utf8'));
