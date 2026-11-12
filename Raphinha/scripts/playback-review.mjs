import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {openBrowser} from '@remotion/renderer';
const file=path.resolve(process.argv[2]),size=fs.statSync(file).size,label=path.basename(file,'.mp4'),dir=process.argv[3]??'review/v1';
const server=http.createServer((req,res)=>{
 if(req.url==='/video'){
  const range=req.headers.range?.match(/bytes=(\d+)-(\d*)/),start=range?Number(range[1]):0,end=range&&range[2]?Math.min(Number(range[2]),size-1):size-1;
  const headers={'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':end-start+1};if(range)headers['Content-Range']=`bytes ${start}-${end}/${size}`;
  res.writeHead(range?206:200,headers);fs.createReadStream(file,{start,end}).pipe(res);return;
 }
 res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});res.end('<html><body style="margin:0;background:#020c1f"><video id="film" playsinline controls preload="auto" width="360" height="640" src="/video"></video></body></html>');
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await openBrowser('chrome');let heartbeat;
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:400,height:680,deviceScaleFactor:1});
 await page.goto({url:`http://127.0.0.1:${server.address().port}`,timeout:30000});
 heartbeat=setInterval(()=>console.log('Reprodução técnica em andamento.'),15000);
 const result=await page.evaluate(async()=>{
  const v=document.getElementById('film');let mutedFallback=false;
  try{await v.play();}catch{v.muted=true;mutedFallback=true;await v.play();}
  await new Promise((resolve,reject)=>{v.addEventListener('ended',resolve,{once:true});v.addEventListener('error',()=>reject(new Error(v.error?.message)),{once:true});setTimeout(()=>reject(new Error('Tempo excedido')),150000);});
  const q=v.getVideoPlaybackQuality();return {ended:v.ended,duration:v.duration,currentTime:v.currentTime,totalVideoFrames:q.totalVideoFrames,droppedVideoFrames:q.droppedVideoFrames,videoWidth:v.videoWidth,videoHeight:v.videoHeight,muted:v.muted,mutedFallback,subjectiveListening:false};
 });
 clearInterval(heartbeat);heartbeat=null;
 fs.writeFileSync(`${dir}/playback-${label}.json`,JSON.stringify(result,null,2));
 const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${dir}/playback-${label}-last.png`,Buffer.from(value.data,'base64'));
 console.log(JSON.stringify(result,null,2));
}finally{if(heartbeat)clearInterval(heartbeat);await browser.close({silent:true});server.close();}
