import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';

const original = 'public/originais';
const dest = 'public/assets/final-2026';
fs.mkdirSync(dest, {recursive:true});
fs.mkdirSync('review', {recursive:true});
fs.mkdirSync('entrega', {recursive:true});
const assets = {
 'cbf':'cenário de fundo.png', 'trophy':'i.s3.glbimg (16).png',
 'novorizontino':'886191003_1817934426020463_8184669932970236446_n.jfif',
 'juventude':'Gazeta-Esportiva-Futebol_juv2-1200x800.webp',
 'vila-photo':'vila.webp', 'fortaleza-photo':'AME X FOR (3).jpg_Easy-Resize.com (1).webp',
 'vila':'escudo_105_1114.png','fortaleza':'escudo_105_1359.png',
 'juventude-badge':'escudo_738_760.png','crb':'escudo_875_1114.png','criciuma':'escudo_875_1359.png',
 'signature':'Logo-Horizontal-White.png','signature-pink':'Logo-Horizontal.png',
 'watermark':'LOGO INSTAPLAYSSS SPORTSMATCH(1).png',
};
const report=[];
for(const [name, file] of Object.entries(assets)) {
 const input=path.join(original,file); const m=await sharp(input).metadata();
 const logo = ['signature','signature-pink','watermark'].includes(name);
 const badge = ['vila','fortaleza','juventude-badge','crb','criciuma'].includes(name);
 let pipeline=sharp(input);
 if(logo||badge) pipeline=pipeline.trim({threshold:8});
 else pipeline=pipeline.resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true});
 await pipeline.png().toFile(`${dest}/${name}.png`);
 report.push({name,source:input,width:m.width,height:m.height,alpha:m.hasAlpha});
}
// The only supplied international league marks are embedded in the corrected art.
// Extract the original pixels; preserve their labels and proportions.
for(const [name,left,top,width,height] of [
 ['championship',163,1241,112,145],['bundesliga',423,1241,146,148],['laliga',701,1241,142,145]
]) await sharp(`${original}/tela_07.png`).extract({left,top,width,height}).png().toFile(`${dest}/${name}.png`);
fs.writeFileSync('review/asset-inspection.json',JSON.stringify(report,null,2));
const music='public/audio/Energetic Upbeat Percussive Clap and Stomp Background Music.mp3';
const pcm=spawnSync(ffmpeg,['-v','error','-ss','10','-i',music,'-t','50','-ac','1','-ar','12000','-f','f32le','pipe:1'],{maxBuffer:16*1024*1024});
if(pcm.status!==0) throw new Error(pcm.stderr.toString());
const samples=new Float32Array(pcm.stdout.buffer.slice(pcm.stdout.byteOffset,pcm.stdout.byteOffset+pcm.stdout.byteLength));
const raw=[]; const attack=[]; let last=0;
for(let f=0;f<1500;f++){
 const a=samples.subarray(f*400,(f+1)*400); let sum=0,high=0,prev=0;
 for(const v of a){sum+=v*v;high+=(v-prev)*(v-prev);prev=v;}
 const energy=Math.sqrt(sum/Math.max(1,a.length));
 const transient=Math.sqrt(high/Math.max(1,a.length));
 raw.push(energy); attack.push(Math.max(0,energy-last)*3+transient*.5); last=energy;
}
const norm=Math.max(...raw),anorm=Math.max(...attack);let env=0;
const pulse=raw.map((v,i)=> {const target=Math.min(1,.45*v/norm+.8*attack[i]/anorm);env=Math.max(target,env*.77); return +env.toFixed(4)});
fs.writeFileSync('src/music-pulse.json',JSON.stringify(pulse));
const metadata = file=>JSON.parse(spawnSync(probe.path,['-v','quiet','-show_format','-show_streams','-of','json',file],{encoding:'utf8'}).stdout);
const refs=[];
for(const file of fs.readdirSync(original).filter(x=>x.endsWith('.mp4'))){
 const m=metadata(`${original}/${file}`);refs.push({file,...m});
 const duration=Number(m.format.duration);
 for(let i=0;i<5;i++) spawnSync(ffmpeg,['-v','error','-y','-ss',String(Math.min(duration-.2,(i+.3)*duration/5)),'-i',`${original}/${file}`,'-frames:v','1','-vf','scale=270:-1',`review/${file.replace('.mp4','')}-${i}.jpg`]);
}
fs.writeFileSync('review/reference-metadata.json',JSON.stringify(refs,null,2));
const frames=fs.readdirSync('review').filter(x=>/Referencia.*jpg/.test(x));
const thumbs=[];
for(let i=0;i<frames.length;i++) thumbs.push({input:await sharp(`review/${frames[i]}`).resize(240,440,{fit:'contain',background:'#020c1f'}).toBuffer(),left:(i%5)*240,top:Math.floor(i/5)*440});
if(thumbs.length) await sharp({create:{width:1200,height:Math.ceil(thumbs.length/5)*440,channels:3,background:'#020c1f'}}).composite(thumbs).jpeg().toFile('review/benchmarks.jpg');
console.log('Assets preserved; working copies and music analysis prepared.');
