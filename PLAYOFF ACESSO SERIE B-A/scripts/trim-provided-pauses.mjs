import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const source='public/audio/narracao-final-2026-fornecida.mp3';
const pcm=spawnSync(ffmpeg,['-v','error','-i',source,'-ac','1','-ar','48000','-f','f32le','pipe:1'],{maxBuffer:32*1024*1024});
if(pcm.status!==0)throw new Error(pcm.stderr.toString());
const rate=48000;const samples=pcm.stdout.byteLength/4;const duration=samples/rate;
const log=fs.readFileSync('review/voice-silences.txt','utf8');
const silences=[...log.matchAll(/silence_end: ([\d.]+) \| silence_duration: ([\d.]+)/g)].map(m=>({start:Number(m[1])-Number(m[2]),end:Number(m[1]),duration:Number(m[2])}));
const tail=silences.find(s=>Math.abs(s.end-duration)<.04);
const tailCut=tail?Math.max(0,tail.duration-.09):0;
// User authorized wording changes needed to preserve facts, with a written record.
// The supplied take inserted an unsupported attribution between the vote and the editorial reading.
// Both edit points lie in measured silences; speech rate and the other pauses remain intact.
const cuts=[{start:36.67,end:39.17,reason:'remoção de "E os argumentos utilizados foram de", ausente do roteiro aprovado e sem comprovação como declaração oficial'}];
for(const cut of cuts)for(const point of [cut.start,cut.end])if(!silences.some(s=>point>=s.start&&point<=s.end))throw new Error(`Corte fora de pausa medida: ${point}`);
if(tailCut>0)cuts.push({start:duration-tailCut,end:duration,reason:'cauda silenciosa'});
const parts=[];let sampleStart=0;
for(const cut of cuts){const a=Math.round(cut.start*rate),b=Math.round(cut.end*rate);parts.push(pcm.stdout.subarray(sampleStart*4,a*4));sampleStart=b;}
parts.push(pcm.stdout.subarray(sampleStart*4));
const joined=Buffer.concat(parts);
const out=spawnSync(ffmpeg,['-v','error','-y','-f','f32le','-ar','48000','-ac','1','-i','pipe:0','-c:a','pcm_s24le','public/audio/narracao-final-2026-ajustada.wav'],{input:joined,maxBuffer:1024*1024});
if(out.status!==0)throw new Error(out.stderr.toString());
const report={source,originalDuration:duration,editedDuration:joined.byteLength/4/rate,playbackRate:1,pitchChanged:false,wordingChanged:true,remainingPausesPreserved:true,cuts};
fs.writeFileSync('review/voice-pause-edits.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
