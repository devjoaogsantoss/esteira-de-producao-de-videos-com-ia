import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {openBrowser} from '@remotion/renderer';
const input=process.argv.slice(2).find(a=>!a.startsWith('--'));
const file=path.resolve(input??'entrega/Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4');
const report=input?`review/revisao-grafica/playback-${path.basename(file,'.mp4')}`:'review/final-playback';
const size=fs.statSync(file).size;
const server=http.createServer((req,res)=>{
 if(req.url==='/video'){
  const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/);
  const start=range?Number(range[1]):0;const end=range&&range[2]?Math.min(Number(range[2]),size-1):size-1;
  const headers={'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':end-start+1};
  if(range)headers['Content-Range']=`bytes ${start}-${end}/${size}`;
  res.writeHead(range?206:200,headers);fs.createReadStream(file,{start,end}).pipe(res);return;
 }
 res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
 res.end('<html><body style="margin:0;background:#020c1f"><video id="film" controls playsinline preload="auto" style="width:360px;height:640px" src="/video"></video></body></html>');
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const browser=await openBrowser('chrome');
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:400,height:720,deviceScaleFactor:1});
 await page.goto({url:`http://127.0.0.1:${server.address().port}`,timeout:30000});
 if(process.argv.includes('--last-frame-only')){
  await page.evaluate(async()=>{const v=document.getElementById('film');if(v.readyState<1)await new Promise(r=>v.addEventListener('loadedmetadata',r,{once:true}));await new Promise(r=>{v.addEventListener('seeked',r,{once:true});v.currentTime=v.duration-1/30;});v.pause();});
  const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});
  fs.writeFileSync(`${report}-last-frame.png`,Buffer.from(value.data,'base64'));
  console.log('Último quadro do MP4 capturado.');
 }else{
 console.log('Reproduzindo o MP4 exportado integralmente no navegador.');
 const heartbeat=setInterval(()=>console.log('Playback em andamento.'),10000);
 const result=await page.evaluate(async()=>{
  const v=document.getElementById('film');let mutedFallback=false;
  try{await v.play();}catch{v.muted=true;mutedFallback=true;await v.play();}
  await new Promise((resolve,reject)=>{v.addEventListener('ended',resolve,{once:true});v.addEventListener('error',()=>reject(new Error(v.error?.message)),{once:true});setTimeout(()=>reject(new Error('Playback excedeu 60s')),60000)});
  const q=v.getVideoPlaybackQuality();return {ended:v.ended,currentTime:v.currentTime,duration:v.duration,muted:v.muted,mutedFallback,totalVideoFrames:q.totalVideoFrames,droppedVideoFrames:q.droppedVideoFrames,videoWidth:v.videoWidth,videoHeight:v.videoHeight,volume:v.volume,subjectiveListening:false};
 });
 clearInterval(heartbeat);
 fs.writeFileSync(`${report}.json`,JSON.stringify(result,null,2));
 const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync(`${report}-last-frame.png`,Buffer.from(value.data,'base64'));
 console.log(JSON.stringify(result,null,2));
 }
}finally{await browser.close({silent:true});server.close();}
