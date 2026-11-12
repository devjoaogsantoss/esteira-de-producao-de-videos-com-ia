import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const mode=process.argv[2]??'proof';
const out='entrega/revisao-grafica',review='review/revisao-grafica';
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(review,{recursive:true});
const inputs=['src/GraphicFilm.tsx','src/GraphicRevision.tsx','src/Root.tsx','src/timing.json','public/audio/mix-final-2026.wav'];
const fingerprint=()=>crypto.createHash('sha256').update(inputs.map(p=>fs.readFileSync(p)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
let serveUrl;
if(mode==='full'&&fs.existsSync(`${review}/bundle-manifest.json`)){
 const manifest=JSON.parse(fs.readFileSync(`${review}/bundle-manifest.json`));
 if(manifest.fingerprint===fingerprint()&&fs.existsSync(manifest.serveUrl))serveUrl=manifest.serveUrl;
}
if(!serveUrl){
 console.log('Preparando composição gráfica V2.');
 serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('build-graphic')});
 fs.writeFileSync(`${review}/bundle-manifest.json`,JSON.stringify({serveUrl,fingerprint:fingerprint()},null,2));
}
const browser=await openBrowser('chrome');
const audits=[];let currentLabel='';
// Inspect the actual, font-loaded DOM immediately before the rendering tab closes.
const newPage=browser.newPage.bind(browser);
browser.newPage=async(args)=>{
 const page=await newPage(args);const close=page.close.bind(page);
 page.close=async(opts)=>{
  try{
   const audit=await page.evaluate(()=>{
    const visible=e=>{let p=e,opacity=1;while(p&&p!==document){const s=getComputedStyle(p);if(s.display==='none'||s.visibility==='hidden')return false;opacity*=Number(s.opacity);p=p.parentElement;}return opacity>.15};
    const safe=[...document.querySelectorAll('[data-safe]')].filter(visible).map(el=>{const r=el.getBoundingClientRect();return {text:el.textContent.slice(0,120),x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,overflow:el.scrollWidth>el.clientWidth+2,violation:r.width>0&&(r.x<89||r.right>901||r.y<239||r.bottom>1501)}});
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;const texts=[];
    const canvas=document.createElement('canvas').getContext('2d');
    while(n=walker.nextNode()){
     if(!n.textContent.trim()||!n.parentElement?.closest('[data-safe]')||!visible(n.parentElement))continue;
     const range=document.createRange();range.selectNodeContents(n);const style=getComputedStyle(n.parentElement);
     canvas.font=style.font||`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
     const m=canvas.measureText(n.textContent.trim());
     for(const r of range.getClientRects()){
      const baseline=r.y+m.fontBoundingBoxAscent;
      let b={x:r.x,y:baseline-m.actualBoundingBoxAscent,right:r.right,bottom:baseline+m.actualBoundingBoxDescent};let p=n.parentElement;
      while(p){const s=getComputedStyle(p);if(['hidden','clip'].includes(s.overflow)){const a=p.getBoundingClientRect();b={x:Math.max(b.x,a.x),y:Math.max(b.y,a.y),right:Math.min(b.right,a.right),bottom:Math.min(b.bottom,a.bottom)}}p=p.parentElement;}
      if(b.right-b.x<2||b.bottom-b.y<2)continue;
      texts.push({...b,text:n.textContent.trim(),size:parseFloat(style.fontSize)});
     }
    }
    const overlaps=[];
    for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
     const a=texts[i],b=texts[j];const w=Math.min(a.right,b.right)-Math.max(a.x,b.x),h=Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y);
     if(w>9&&h>7)overlaps.push({a:a.text,b:b.text,w,h});
    }
    return {safe,texts,overlaps};
   });
   if(audit.safe.length)audits.push({label:currentLabel,...audit});
  }catch{}
  return close(opts);
 };return page;
};
const composition=await selectComposition({serveUrl,id:'SerieB2026-Grafica-V2',puppeteerInstance:browser});
const progress=label=>{let last=-1;return ({progress})=>{const n=Math.floor(progress*10);if(n>last){console.log(`${label}: ${n*10}%`);last=n;}}};
try{
 if(mode==='proof'){
  for(const [id,file] of [['Estudo-Titulo-A','01-Titulo-A'],['Estudo-Titulo-B','02-Titulo-B'],['Estudo-Acesso-Direto','03-Acesso-Direto'],['Estudo-Playoff','04-Playoff']]){
   currentLabel=id;
   const c=await selectComposition({serveUrl,id,puppeteerInstance:browser});
   await renderStill({serveUrl,composition:c,puppeteerInstance:browser,output:`${out}/${file}.png`});
   await sharp(`${out}/${file}.png`).resize(360,640).toFile(`${out}/${file}-360.png`);
  }
  const frames=[60,135,190,238,248,260,274,280,288,302,312,355,410,438,474,485,499,520,550,575,595,635,667,680,714,760,815,925,990,1035,1125,1285,1415,1493];
  for(const frame of frames){
   currentLabel=`frame-${frame}`;
   await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:`${review}/v2-${frame}.png`});
   console.log(`Quadro ${frame} revisado.`);
  }
  fs.writeFileSync(`${review}/layout-audit.json`,JSON.stringify(audits,null,2));
  const problems=audits.flatMap(a=>a.safe.filter(x=>x.violation||x.overflow).map(x=>({frame:a.label,...x})));
  const overlaps=audits.flatMap(a=>a.overlaps.map(x=>({frame:a.label,...x})));
  fs.writeFileSync(`${review}/layout-findings.json`,JSON.stringify({problems,overlaps},null,2));
  console.log(`Auditoria: ${problems.length} limites/overflow; ${overlaps.length} interseções de texto para inspeção.`);
  const parts=[];
  for(let i=0;i<frames.length;i++)parts.push({input:await sharp(`${review}/v2-${frames[i]}.png`).resize(270,480).toBuffer(),left:i%6*270,top:Math.floor(i/6)*480});
  await sharp({create:{width:1620,height:Math.ceil(frames.length/6)*480,channels:3,background:'#020c1f'}}).composite(parts).jpeg().toFile(`${review}/proof-contact.jpg`);
  // Two before/after pairs per row, each image exactly 360px wide.
  const comparisons=[['8.9',274,'ACESSO DIRETO'],['16.8',520,'PLAYOFF'],['23.7',714,'DISPUTA EM ABERTO'],['32.8',990,'CONFRONTOS']];
  const cp=[];
  for(let i=0;i<comparisons.length;i++){
   const [old,frame,label]=comparisons[i];const col=i%2*760,row=Math.floor(i/2)*710;
   cp.push({input:await sharp(`${review}/original-${old}.png`).resize(360,640).toBuffer(),left:col,top:row+55});
   cp.push({input:await sharp(`${review}/v2-${frame}.png`).resize(360,640).toBuffer(),left:col+380,top:row+55});
   cp.push({input:Buffer.from(`<svg width="740" height="45"><text x="7" y="30" fill="#eeeeF0" font-family="Arial" font-size="22">${label} · ATUAL</text><text x="387" y="30" fill="#ff0244" font-family="Arial" font-size="22">REVISÃO V2</text></svg>`),left:col,top:row});
  }
  await sharp({create:{width:1520,height:1420,channels:3,background:'#020c1f'}}).composite(cp).png().toFile(`${out}/Comparacao-Antes-Depois.png`);
  const important=[[274,'Acesso-Direto'],[520,'Playoff'],[714,'Disputa'],[990,'Confrontos']];
  for(const [f,name]of important){fs.copyFileSync(`${review}/v2-${f}.png`,`${out}/Quadro-${name}.png`);await sharp(`${review}/v2-${f}.png`).resize(360,640).toFile(`${out}/Quadro-${name}-360.png`);}
  console.log('Renderizando trecho de “sobem direto” até os vencedores dos playoffs.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,frameRange:[216,523],codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',concurrency:2,outputLocation:`${out}/Trecho-Acesso-Playoffs-V2.mp4`,onProgress:progress('Trecho')});
 }else if(mode==='full'){
  console.log('Renderizando vídeo completo; o áudio aprovado será copiado sem recodificação.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,muted:true,codec:'h264',crf:18,pixelFormat:'yuv420p',concurrency:2,outputLocation:`${review}/v2-video-only.mp4`,onProgress:progress('Completo')});
  const mux=spawnSync(ffmpeg,['-v','error','-y','-i',`${review}/v2-video-only.mp4`,'-i','entrega/Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4','-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',`${out}/Sportsmatch-SerieB2026-GRAFICA-V2.mp4`],{encoding:'utf8'});
  if(mux.status!==0)throw new Error(mux.stderr);
  console.log('V2 exportada com o fluxo AAC original preservado.');
 }else throw new Error(`Modo desconhecido: ${mode}`);
}finally{await browser.close({silent:true});}
