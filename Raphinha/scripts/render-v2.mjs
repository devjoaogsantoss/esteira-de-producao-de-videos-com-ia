import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
const mode=process.argv[2]??'snapshots',dir='review/v2',out='entrega/v2';
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(out,{recursive:true});fs.mkdirSync('public/paper',{recursive:true});
const cuts=[180,269,635,1326,1596,2150,2382,2567,2796,3021,3540];
const selectedCuts=process.argv.slice(3).map(Number);
const sourceFiles=fs.readdirSync('src').filter(f=>/\.(tsx?|json)$/.test(f)).map(f=>`src/${f}`);
const sourceFingerprint=crypto.createHash('sha256').update(sourceFiles.map(f=>fs.readFileSync(f)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
if(mode!=='snapshots'){
 const snapshotManifest=fs.existsSync(`${dir}/paper-manifest.json`)?JSON.parse(fs.readFileSync(`${dir}/paper-manifest.json`)):null;
 if(snapshotManifest?.sourceFingerprint!==sourceFingerprint||cuts.some(c=>!fs.existsSync(`public/paper/page-${c}.png`))){
  console.log('Atualizando as páginas de papel para o conteúdo atual.');
  const prepare=spawnSync(process.execPath,['scripts/render-v2.mjs','snapshots'],{encoding:'utf8',maxBuffer:8*1024*1024});
  process.stdout.write(prepare.stdout??'');if(prepare.status!==0)throw new Error(prepare.stderr);
 }
}
const inputs=[...sourceFiles,...cuts.map(c=>`public/paper/page-${c}.png`).filter(f=>fs.existsSync(f))];
const fingerprint=crypto.createHash('sha256').update(inputs.map(f=>fs.readFileSync(f)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
const previous=fs.existsSync(`${dir}/bundle.json`)?JSON.parse(fs.readFileSync(`${dir}/bundle.json`)):null;
let serveUrl;
if(previous?.fingerprint===fingerprint&&fs.existsSync(previous.serveUrl))serveUrl=previous.serveUrl;
else{serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve(mode==='snapshots'?'build-art-snapshots':'build-art-video')});fs.writeFileSync(`${dir}/bundle.json`,JSON.stringify({serveUrl,fingerprint}));}
const browser=await openBrowser('chrome');
try{
 const inputProps={artistic:true,paperTransitions:mode!=='snapshots'};
 const composition=await selectComposition({serveUrl,id:'Raphinha-V2',puppeteerInstance:browser,inputProps});
 if(mode==='snapshots'){
  for(const cut of cuts.filter(c=>!selectedCuts.length||selectedCuts.includes(c))){await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame:cut-1,output:`public/paper/page-${cut}.png`});console.log(`Papel da cena anterior ao frame ${cut} preparado.`);}
  if(!selectedCuts.length)fs.writeFileSync(`${dir}/paper-manifest.json`,JSON.stringify({sourceFingerprint,cuts},null,2));
  for(const frame of [0,8,18,35,52,75,100,215,325,380,1370,2470,2850,3130]){
   await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame,output:`${dir}/pre-${frame}.png`});await sharp(`${dir}/pre-${frame}.png`).resize(360,640).toFile(`${dir}/pre-${frame}-360.png`);
  }
 }else if(mode==='proof'||mode==='proof-lite'){
  const frames=mode==='proof-lite'?[0,18,52,183,187,191,215,278,3130,3548]:[0,8,18,35,52,75,100,179,183,187,191,197,215,268,273,278,287,325,365,380,439,600,640,645,650,810,960,1160,1334,1370,1605,1740,2200,2392,2470,2575,2630,2803,2850,3028,3130,3548,3599];
  for(const frame of frames){await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame,output:`${dir}/frame-${frame}.png`});await sharp(`${dir}/frame-${frame}.png`).resize(360,640).toFile(`${dir}/frame-${frame}-360.png`);console.log(`V2 · quadro ${frame}`);}
  console.log('Exportando trecho da abertura, papel e números.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,inputProps,frameRange:[0,479],codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',concurrency:2,outputLocation:`${out}/Trecho-Abertura-Papel-V2.mp4`,onProgress:progress('Trecho V2')});
 }else if(mode==='full'){
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,inputProps,muted:true,codec:'h264',crf:18,pixelFormat:'yuv420p',concurrency:2,outputLocation:`${dir}/video-only.mp4`,onProgress:progress('V2')});
  const r=spawnSync(ffmpeg,['-v','error','-y','-i',`${dir}/video-only.mp4`,'-i','entrega/v1/Sportsmatch-Raphinha-V1.mp4','-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',`${out}/Sportsmatch-Raphinha-V2.mp4`],{encoding:'utf8'});
  if(r.status!==0)throw new Error(r.stderr);
  console.log('V2 exportada com o fluxo AAC da V1 preservado.');
 }else throw new Error('Modos: snapshots, proof, full.');
}finally{await browser.close({silent:true});}
function progress(label){let last=-1;return({progress,renderedFrames})=>{const p=Math.floor(progress*20);if(p>last){console.log(`${label}: ${p*5}% · ${renderedFrames} quadros`);last=p;}};}
