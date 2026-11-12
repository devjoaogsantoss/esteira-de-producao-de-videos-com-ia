import fs from 'node:fs';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';
import sharp from 'sharp';
const mode=process.argv[2]??'excerpt';
const out='entrega/revisao-grafica',review='review/revisao-grafica';
const file=mode==='full'?`${out}/Sportsmatch-SerieB2026-GRAFICA-V2.mp4`:`${out}/Trecho-Acesso-Playoffs-V2.mp4`;
const exec=(binary,args,maxBuffer=16*1024*1024)=>{const r=spawnSync(binary,args,{encoding:'utf8',maxBuffer});if(r.status!==0)throw new Error(r.stderr);return r;};
const meta=JSON.parse(exec(probe.path,['-v','quiet','-show_format','-show_streams','-of','json',file]).stdout);
const video=meta.streams.find(s=>s.codec_type==='video');
if(video.width!==1080||video.height!==1920||video.avg_frame_rate!=='30/1'||video.codec_name!=='h264')throw new Error('Formato divergente do briefing.');
const decode=exec(ffmpeg,['-v','error','-i',file,'-f','null','-']);
if(decode.stderr.trim())throw new Error(`Erro de decodificação: ${decode.stderr}`);
const shots=mode==='full'?[8.5,9.15,10.2,12.5,16.7,19.9,22.4,23.8,27.8,32.8,36.6,38.7,43.5,47.0,49.7]:[0.8,1.2,1.8,2.9,3.5,4.4,5.9,7.2,8.8,9.5,10.1];
const parts=[];
for(let i=0;i<shots.length;i++){
 const img=`${review}/${mode}-export-${i}.png`;
 exec(ffmpeg,['-v','error','-y','-ss',String(shots[i]),'-i',file,'-frames:v','1',img]);
 parts.push({input:await sharp(img).resize(270,480).toBuffer(),left:i%5*270,top:Math.floor(i/5)*480});
}
await sharp({create:{width:1350,height:Math.ceil(shots.length/5)*480,channels:3,background:'#020c1f'}}).composite(parts).jpeg().toFile(`${review}/${mode}-export-contact.jpg`);
const report={file,codec:video.codec_name,width:video.width,height:video.height,fps:video.avg_frame_rate,frames:Number(video.nb_frames),duration:Number(meta.format.duration),decodedWithoutErrors:true};
if(mode==='full'){
 if(Number(meta.format.duration)>50||Number(video.nb_frames)!==1494)throw new Error('Duração ou quantidade de frames divergente.');
 const original='entrega/Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4';
 const audioHash=f=>exec(ffmpeg,['-v','error','-i',f,'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-']).stdout.trim();
 report.approvedAudioBitstreamSha256=audioHash(original);report.revisedAudioBitstreamSha256=audioHash(file);
 report.approvedAudioCopiedExactly=report.approvedAudioBitstreamSha256===report.revisedAudioBitstreamSha256;
 const mixHash=crypto.createHash('sha256').update(fs.readFileSync('public/audio/mix-final-2026.wav')).digest('hex');
 report.approvedMixFileUnchanged=mixHash===fs.readFileSync(`${review}/audio-original-sha256.txt`,'utf8').trim();
 if(!report.approvedAudioCopiedExactly||!report.approvedMixFileUnchanged)throw new Error('O áudio aprovado foi alterado.');
 const findings=JSON.parse(fs.readFileSync(`${review}/layout-findings.json`));
 report.layoutAuditedStates=JSON.parse(fs.readFileSync(`${review}/layout-audit.json`)).length;
 report.safeAreaViolations=findings.problems.length;report.textInkOverlaps=findings.overlaps.length;
 const loudness=exec(ffmpeg,['-hide_banner','-i',file,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-']).stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0];
 report.loudness=loudness?JSON.parse(loudness):null;
 report.wordSync=[{word:'sobem direto',audioSeconds:[8.26,9.20],actionFrames:[248,272]},{word:'terceiro contra sexto',audioSeconds:[11.10,12.56],actionFrames:[333,346]},{word:'quarto contra quinto',audioSeconds:[12.94,13.92],actionFrames:[388,401]},{word:'ida e volta',audioSeconds:[14.16,15.40],actionFrames:[425,436]},{word:'cada vencedor',audioSeconds:[15.80,16.64],actionFrames:[474,499]},{word:'garantiu o acesso',audioSeconds:[19.16,20.20],actionFrames:[575,594]},{word:'disputam',audioSeconds:[22.22,22.56],actionFrames:[667,680]}];
 fs.writeFileSync(`${out}/VERIFICACAO-GRAFICA-V2.json`,JSON.stringify(report,null,2));
}else fs.writeFileSync(`${review}/excerpt-verification.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
// Rebuild the title comparison from the final corrected studies at phone size.
const titleParts=[];
for(const [i,p,label] of [[0,`${review}/original-23.7.png`,'ATUAL · 88 PX'],[1,`${out}/01-Titulo-A.png`,'A · 110 PX'],[2,`${out}/02-Titulo-B.png`,'B · LINHAS CURTAS']]){
 titleParts.push({input:await sharp(p).resize(360,640).toBuffer(),left:i*380+10,top:62});
 titleParts.push({input:Buffer.from(`<svg width="360" height="50"><text x="8" y="33" fill="#eeeeF0" font-family="Arial" font-size="21">${label}</text></svg>`),left:i*380+10,top:0});
}
await sharp({create:{width:1140,height:714,channels:3,background:'#020c1f'}}).composite(titleParts).png().toFile(`${out}/Comparacao-Titulos.png`);
