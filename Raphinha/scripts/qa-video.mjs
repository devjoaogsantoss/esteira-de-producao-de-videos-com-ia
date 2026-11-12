import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';
import sharp from 'sharp';
const file=process.argv[2],label=path.basename(file,'.mp4'),full=/^Sportsmatch-Raphinha-V\d+$/.test(label),dir=process.argv[3]??'review/v1',art=label.includes('V2'),updatedVoice=label.includes('V3');
const run=(cmd,args)=>{const r=spawnSync(cmd,args,{encoding:'utf8',maxBuffer:32*1024*1024});if(r.status!==0)throw new Error(r.stderr);return r;};
const meta=JSON.parse(run(probe.path,['-v','error','-show_streams','-show_format','-of','json',file]).stdout),v=meta.streams.find(s=>s.codec_type==='video'),a=meta.streams.find(s=>s.codec_type==='audio');
if(v.codec_name!=='h264'||v.width!==1080||v.height!==1920||v.avg_frame_rate!=='30/1'||!a||a.codec_name!=='aac')throw new Error('Formato inesperado.');
const decode=run(ffmpeg,['-v','error','-i',file,'-f','null','-']);if(decode.stderr.trim())throw new Error(decode.stderr);
const expected=updatedVoice?(full?3690:630):full?3600:art?480:750;if(Number(v.nb_frames)!==expected)throw new Error('Contagem inesperada de frames.');
const shots=updatedVoice?(full?[0,1.7,6.2,10.5,20,25,33,41,44,55,65,71,80,85,90,92.1,93.6,96,99,102.5,104.7,106.5,108,118.5,121.3,122.96]:[0,1.5,2.9,3.2,4.6,7,10,13,15.3,15.7,17,19,20.96]):art?(full?[0,.33,1.7,3,6.2,6.4,7.2,9.2,11,12.6,20.5,23,27,32,38.5,44.4,45.8,53.4,58,71.9,74,79.6,82,85.8,87.5,93.4,95,100.9,104,116.5,118.3,119.96]:[0,.1,.3,.6,1,1.7,2.5,3.3,5.95,6.13,6.3,6.56,7.2,8.94,9.14,9.33,10,11,12.6,14,15.9]):full?[0,7.2,14,20.5,23,27,32,38.5,45.8,58,68,74,82,87.5,95,102,104,116.5,119.96]:[.2,2.7,4.9,6.7,8.3,9.4,10.5,12,14.4,16.5,18,20,22,24.9];
for(let i=0;i<shots.length;i++){
 const out=`${dir}/${label}-export-${i}.png`;
 run(ffmpeg,['-v','error','-y','-ss',String(shots[i]),'-i',file,'-frames:v','1',out]);
 await sharp(out).resize(360,640).toFile(out.replace('.png','-360.png'));
}
const loud=run(ffmpeg,['-hide_banner','-i',file,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-']).stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0];
const report={file,codec:v.codec_name,audioCodec:a.codec_name,width:v.width,height:v.height,fps:v.avg_frame_rate,videoFrames:Number(v.nb_frames),videoDuration:Number(v.duration),containerDuration:Number(meta.format.duration),bytes:Number(meta.format.size),decodeWithoutErrors:true,loudness:loud?JSON.parse(loud):null,extractedFrames:shots,subjectiveListening:false};
if(full&&art){
 const hash=f=>run(ffmpeg,['-v','error','-i',f,'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-']).stdout.trim();
 report.originalAudioHash=hash('entrega/v1/Sportsmatch-Raphinha-V1.mp4');report.audioHash=hash(file);report.audioCopiedExactly=report.originalAudioHash===report.audioHash;
 if(!report.audioCopiedExactly)throw new Error('Áudio da V1 não foi preservado.');
}
fs.writeFileSync(`${dir}/qa-${label}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
