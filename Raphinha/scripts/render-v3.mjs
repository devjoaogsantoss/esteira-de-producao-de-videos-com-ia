import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
const mode=process.argv[2]??'snapshots',dir='review/v3',out='entrega/v3';
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(out,{recursive:true});fs.mkdirSync('public/paper-v3',{recursive:true});
const timing=JSON.parse(fs.readFileSync('src/timing-v3.json','utf8')),cuts=timing.cuts;
const selectedCuts=process.argv.slice(3).map(Number);
const sourceFiles=fs.readdirSync('src').filter(f=>/\.(tsx?|json)$/.test(f)).map(f=>`src/${f}`);
const sourceFingerprint=crypto.createHash('sha256').update(sourceFiles.map(f=>fs.readFileSync(f)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
if(mode!=='snapshots'){
 const snapshotManifest=fs.existsSync(`${dir}/paper-manifest.json`)?JSON.parse(fs.readFileSync(`${dir}/paper-manifest.json`)):null;
 if(snapshotManifest?.sourceFingerprint!==sourceFingerprint||cuts.some(c=>!fs.existsSync(`public/paper-v3/page-${c}.png`))){
  console.log('Atualizando as páginas de papel para o conteúdo atual.');
  const prepare=spawnSync(process.execPath,['scripts/render-v3.mjs','snapshots'],{encoding:'utf8',maxBuffer:8*1024*1024});
  process.stdout.write(prepare.stdout??'');if(prepare.status!==0)throw new Error(prepare.stderr);
 }
}
const inputs=[...sourceFiles,...cuts.map(c=>`public/paper-v3/page-${c}.png`).filter(f=>fs.existsSync(f))];
const fingerprint=crypto.createHash('sha256').update(inputs.map(f=>fs.readFileSync(f)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
const previous=fs.existsSync(`${dir}/bundle.json`)?JSON.parse(fs.readFileSync(`${dir}/bundle.json`)):null;
let serveUrl;
if(previous?.fingerprint===fingerprint&&fs.existsSync(previous.serveUrl))serveUrl=previous.serveUrl;
else{serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve(mode==='snapshots'?'build-v3-snapshots':'build-v3-video')});fs.writeFileSync(`${dir}/bundle.json`,JSON.stringify({serveUrl,fingerprint}));}
const browser=await openBrowser('chrome');
try{
 const inputProps={paperTransitions:mode!=='snapshots'};
 const composition=await selectComposition({serveUrl,id:'Raphinha-V3',puppeteerInstance:browser,inputProps});
 if(mode==='snapshots'){
  for(const cut of cuts.filter(c=>!selectedCuts.length||selectedCuts.includes(c))){await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame:cut-1,output:`public/paper-v3/page-${cut}.png`});console.log(`Papel da cena anterior ao frame ${cut} preparado.`);}
  if(!selectedCuts.length)fs.writeFileSync(`${dir}/paper-manifest.json`,JSON.stringify({sourceFingerprint,cuts},null,2));
  for(const frame of [52,2765,2800,2910,3030,3100,3170,3230,3689]){
   await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame,output:`${dir}/pre-${frame}.png`});await sharp(`${dir}/pre-${frame}.png`).resize(360,640).toFile(`${dir}/pre-${frame}-360.png`);
  }
 }else if(mode==='proof'||mode==='proof-lite'){
  const frames=[0,52,180,280,650,785,935,1100,1310,1600,2150,2360,2530,2700,2758,2765,2780,2820,2910,3030,3100,3138,3170,3200,3230,3500,3640,3689];
  for(const frame of frames){await renderStill({serveUrl,composition,puppeteerInstance:browser,inputProps,frame,output:`${dir}/frame-${frame}.png`});await sharp(`${dir}/frame-${frame}.png`).resize(360,640).toFile(`${dir}/frame-${frame}-360.png`);console.log(`V3 · quadro ${frame}`);}
  console.log('Exportando trecho de Flick, Ancelotti e conclusão.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,inputProps,frameRange:[2670,3299],codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',concurrency:2,outputLocation:`${out}/Trecho-Ancelotti-V3.mp4`,onProgress:progress('Trecho V3')});
 }else if(mode==='full'){
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,inputProps,codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',concurrency:2,outputLocation:`${out}/Sportsmatch-Raphinha-V3.mp4`,onProgress:progress('V3')});
  console.log('V3 exportada com a nova narração completa.');
 }else throw new Error('Modos: snapshots, proof, full.');
}finally{await browser.close({silent:true});}
function progress(label){let last=-1;return({progress,renderedFrames})=>{const p=Math.floor(progress*20);if(p>last){console.log(`${label}: ${p*5}% · ${renderedFrames} quadros`);last=p;}};}
