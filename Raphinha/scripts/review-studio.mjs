import fs from 'node:fs';
import {openBrowser} from '@remotion/renderer';
const ids=['Raphinha-Capa','Raphinha-Gancho','Raphinha-Temporada','Raphinha-Timeline-1','Raphinha-Timeline-2','Raphinha-Timeline-3','Raphinha-Timeline-4','Raphinha-Selecao','Raphinha-Grafico','Raphinha-Amostras','Raphinha-Xavi','Raphinha-Flick','Raphinha-Contexto','Raphinha-Fechamento','Raphinha-Assinatura'];
const browser=await openBrowser('chrome');
try {
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:1500,height:1100,deviceScaleFactor:1});
 const report=[];
 for(const id of ids){
  await page.goto({url:`http://localhost:3001/${id}`,timeout:60000});
  for(let attempt=0;attempt<60;attempt++){
   if(await page.evaluate(()=>document.querySelector('[data-artboard]')!==null))break;
   await new Promise(r=>setTimeout(r,500));
  }
  await page.evaluate(()=>document.fonts.ready);
  await new Promise(r=>setTimeout(r,600));
  const result=await page.evaluate(()=>{
   const art=document.querySelector('[data-artboard]');const base=art.getBoundingClientRect();const scale=base.width/1080;
   const items=[...art.querySelectorAll('[data-safe]')].map(el=>{
    const r=el.getBoundingClientRect();return {text:el.textContent,x:(r.left-base.left)/scale,y:(r.top-base.top)/scale,width:r.width/scale,height:r.height/scale,overflow:el.scrollWidth>el.clientWidth+2};
   });
   const violations=items.filter(i=>i.x<89||i.x+i.width>901||i.y<239||i.y+i.height>1501||i.overflow);
   const images=[...art.querySelectorAll('img')].map(i=>({src:i.src,loaded:i.complete&&i.naturalWidth>0}));
   return {items,violations,images,fontLoaded:document.fonts.check('700 40px Poppins')};
  });
  report.push({id,...result});
  if(id==='Raphinha-Capa'||id==='Raphinha-Grafico'){
   const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});
   fs.writeFileSync(`review/studio-${id}.png`,Buffer.from(value.data,'base64'));
  }
  console.log(`${id}: ${result.violations.length} alertas de layout; imagens ${result.images.every(i=>i.loaded)?'carregadas':'pendentes'}.`);
 }
 fs.writeFileSync('review/layout-studio.json',JSON.stringify(report,null,2));
} finally {await browser.close({silent:true});}
