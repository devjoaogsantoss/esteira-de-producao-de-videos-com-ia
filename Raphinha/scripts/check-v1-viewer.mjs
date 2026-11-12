import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {openBrowser} from '@remotion/renderer';
const file=process.argv[2]??'entrega/v1/ASSISTIR-V1.html',dir=process.argv[3]??'review/v1';
const browser=await openBrowser('chrome');
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:1200,height:1000,deviceScaleFactor:1});
 await page.goto({url:pathToFileURL(path.resolve(file)).href,timeout:30000});
 const result=await page.evaluate(async()=>{
  const v=document.getElementById('film');if(v.readyState<1)await new Promise((resolve,reject)=>{v.addEventListener('loadedmetadata',resolve,{once:true});v.addEventListener('error',reject,{once:true});});
  const conclusion=[...document.querySelectorAll('[data-time]')].find(b=>b.textContent.includes('Conclusão')),target=Number(conclusion.dataset.time);
  conclusion.click();await new Promise(r=>setTimeout(r,250));v.pause();const chapterWorks=Math.abs(v.currentTime-target)<1;
  await new Promise(r=>{v.addEventListener('seeked',r,{once:true});v.currentTime=Math.min(v.duration-2,target+3.3);});
  return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,chapters:document.querySelectorAll('[data-time]').length,chapterWorks,readyState:v.readyState,currentTime:v.currentTime};
 });
 if(!result.chapterWorks||result.width!==1080||result.chapters!==9)throw new Error(JSON.stringify(result));
 const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${dir}/visualizador.png`,Buffer.from(value.data,'base64'));
 fs.writeFileSync(`${dir}/visualizador-verificacao.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close({silent:true});}
