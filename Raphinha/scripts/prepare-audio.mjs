import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const sr=48000,channels=2,total=120,offset=10;
const voice='public/audio/narracao-original.mp3',music='public/audio/trap-andretti-idefk.mp3';
const run=(args,encoding)=>{const r=spawnSync(ffmpeg,args,{encoding,maxBuffer:160*1024*1024});if(r.status!==0)throw new Error(r.stderr?.toString());return r;};
const loudness=file=>{const r=run(['-hide_banner','-i',file,'-vn','-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-'],'utf8');return JSON.parse(r.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)[0]);};
const decode=(file,extra=[])=>{const b=run(['-v','error',...extra,'-i',file,'-vn','-ar',String(sr),'-ac','2','-f','f32le','pipe:1']).stdout;return new Float32Array(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));};
const save=(file,samples)=>{const p=spawnSync(ffmpeg,['-v','error','-y','-f','f32le','-ar',String(sr),'-ac','2','-i','pipe:0','-c:a','pcm_f32le',file],{input:Buffer.from(samples.buffer),maxBuffer:16*1024*1024});if(p.status!==0)throw new Error(p.stderr.toString());};
console.log('Medindo os áudios de entrada.');
const vl=loudness(voice),ml=loudness(music);
const v=decode(voice),m=decode(music,['-ss',String(offset),'-t',String(total)]);
const length=total*sr*channels,extended=new Float32Array(length);
// Ambas as emendas ficam dentro de silêncio verificado por silencedetect.
// Não há mudança de velocidade, supressão de palavras ou corte de fonemas.
const pauses=[{at:27.8,seconds:2},{at:91.3,seconds:2.5}];
let last=0,shift=0;
for(const pause of [...pauses,{at:v.length/(sr*channels),seconds:0}]){
 const stop=Math.round(pause.at*sr)*channels;
 extended.set(v.subarray(last,stop),last+Math.round(shift*sr)*channels);
 last=stop;shift+=pause.seconds;
}
const vg=10**((-16.5-Number(vl.input_i))/20),mg=10**((-28-Number(ml.input_i))/20);
const voiced=new Float32Array(length),bed=new Float32Array(length),mixed=new Float32Array(length);
const block=960;let duck=1;
const pulse=[],duckCurve=[];
for(let sample=0;sample<length;sample+=block*channels){
 let energy=0;const n=Math.min(block*channels,length-sample);
 for(let i=0;i<n;i++)energy+=(extended[sample+i]*vg)**2;
 const rms=Math.sqrt(energy/n);
 const target=rms>.009?0.5:1;
 const coefficient=target<duck?.55:.045;
 const old=duck;duck+=(target-duck)*coefficient;
 for(let j=0;j<n;j++){
  const at=sample+j,t=at/(sr*channels),gain=old+(duck-old)*j/n;
  const fade=t<.06?.65+.35*t/.06:t>118.7?Math.max(0,(120-t)/1.3):1;
  voiced[at]=extended[at]*vg;
  bed[at]=(m[at]??0)*mg*gain*fade;
  mixed[at]=voiced[at]+bed[at];
 }
 duckCurve.push({t:sample/(sr*channels),gain:duck,voiceRms:rms});
}
for(let frame=0;frame<total*30;frame++){
 const a=Math.floor(frame/30*sr)*channels,b=Math.min(m.length,a+Math.floor(sr/30)*channels);
 let e=0,attack=0,previous=0;
 for(let i=a;i<b;i+=2){const s=((m[i]??0)+(m[i+1]??0))*.5;e+=s*s;attack+=Math.abs(s-previous);previous=s;}
 pulse.push(Math.sqrt(e/Math.max(1,(b-a)/2))+.2*attack/Math.max(1,(b-a)/2));
}
const sorted=[...pulse].sort((a,b)=>a-b),p95=sorted[Math.floor(sorted.length*.95)]||1;
const normalized=pulse.map((e,i)=>Math.min(1,e/p95*.72+Math.max(0,e-(pulse[i-1]??0))/p95*.7));
fs.writeFileSync('src/music-pulse.json',JSON.stringify(normalized.map(n=>Math.round(n*1000)/1000)));
save('public/audio/narracao-montada.wav',voiced);save('public/audio/trilha-ducking.wav',bed);save('review/v1/mix-antes-normalizacao.wav',mixed);
const first=loudness('review/v1/mix-antes-normalizacao.wav');
const correction=-16-Number(first.input_i);
run(['-v','error','-y','-i','review/v1/mix-antes-normalizacao.wav','-af',`volume=${correction}dB,alimiter=limit=0.794328:level=false:latency=true`,'-ar','48000','-c:a','pcm_s24le','public/audio/mix-v1.wav']);
const final=loudness('public/audio/mix-v1.wav');
const report={durationSeconds:total,musicOffsetSeconds:offset,pauses,originalVoiceSeconds:v.length/(sr*channels),voiceGainDb:20*Math.log10(vg),musicBaseGainDb:20*Math.log10(mg),voiceTargetLufs:-16.5,musicBaseTargetLufs:-28,duckMultiplierDuringVoice:.5,finalGainDb:correction,inputVoice:vl,inputMusic:ml,mix:final,pulseFrames:normalized.length,subjectiveListening:false};
fs.writeFileSync('review/v1/audio-verificacao.json',JSON.stringify(report,null,2));
fs.writeFileSync('review/v1/ducking.json',JSON.stringify(duckCurve));
console.log(JSON.stringify(report,null,2));
