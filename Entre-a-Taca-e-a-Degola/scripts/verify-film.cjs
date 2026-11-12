const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const http = require('http');
const sharp = require('sharp');
const {openBrowser} = require('@remotion/renderer');
const ffmpeg = require('ffmpeg-static');
const probe = require('ffprobe-static').path;
const input = path.resolve(process.argv[2]);
const tag = process.argv[3] || 'final';
const resultDir = path.resolve('review', tag);
fs.mkdirSync(resultDir, {recursive: true});

(async () => {
  const metadata = JSON.parse(cp.execFileSync(probe, ['-v','quiet','-show_format','-show_streams','-of','json',input]).toString());
  fs.writeFileSync(path.join(resultDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
  const duration = Number(metadata.format.duration);
  const decode = cp.spawnSync(ffmpeg, ['-v','error','-i',input,'-f','null','-'], {encoding:'utf8'});
  if (decode.status !== 0) throw new Error(decode.stderr);
  fs.writeFileSync(path.join(resultDir, 'decode.txt'), decode.stderr || 'Complete decode: no errors.');
  const loudness = cp.spawnSync(ffmpeg, ['-hide_banner','-i',input,'-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-'], {encoding:'utf8'});
  const m = loudness.stderr;
  const loud = JSON.parse(m.slice(m.lastIndexOf('{'), m.lastIndexOf('}') + 1));
  fs.writeFileSync(path.join(resultDir, 'loudness.json'), JSON.stringify(loud, null, 2));
  const samples = tag === 'trecho' ? [0, .8, 2.7, 5.2, 9.9, 13.8, 16.9] : [0, 8.8, 10.8, 13.4, 17.8, 21.9, 24.8, 29.9, 35.1, 39.7, 43.4, 49.6, 52.8, 54.6, 56.95, 58.2, duration - 1 / 30];
  const tiles = [];
  for (let i = 0; i < samples.length; i++) {
    const output = path.join(resultDir, `quadro-${String(i).padStart(2, '0')}.png`);
    if (i === samples.length - 1 && tag !== 'trecho') {
      const video = metadata.streams.find(s => s.codec_type === 'video');
      const lastFrame = Number(video.nb_frames) - 1;
      cp.execFileSync(ffmpeg, ['-v','error','-y','-i',input,'-vf',`select=eq(n\\,${lastFrame}),scale=360:640`,'-frames:v','1','-vsync','0',output]);
    } else {
      cp.execFileSync(ffmpeg, ['-v','error','-y','-ss',String(samples[i]),'-i',input,'-frames:v','1','-vf','scale=360:640',output]);
    }
    const label = Buffer.from(`<svg width="360" height="30"><rect width="360" height="30" fill="#101c30"/><text x="10" y="22" fill="white" font-size="18">${samples[i].toFixed(2)}s</text></svg>`);
    tiles.push(await sharp(output).extend({top:30,bottom:10,left:10,right:10,background:'#101c30'}).composite([{input:label,left:10,top:0}]).toBuffer());
  }
  await sharp({create:{width:1520,height:680*Math.ceil(tiles.length/4),channels:3,background:'#101c30'}}).composite(tiles.map((input,i)=>({input,left:i%4*380,top:Math.floor(i/4)*680}))).png().toFile(path.join(resultDir,'Quadros-MP4.png'));
  const size = fs.statSync(input).size;
  const server = http.createServer((req, res) => {
    if (req.url === '/video') {
      const range = req.headers.range?.match(/bytes=(\d+)-(\d*)/);
      const start = range ? Number(range[1]) : 0, end = range && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      const headers = {'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':end-start+1};
      if (range) headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
      res.writeHead(range ? 206 : 200, headers); fs.createReadStream(input,{start,end}).pipe(res); return;
    }
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.end('<html><body style="margin:0;background:#020c1f"><video id="film" controls playsinline preload="auto" style="width:360px;height:640px" src="/video"></video></body></html>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await openBrowser('chrome');
  let heartbeat;
  try {
    const page = await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
    await page.setViewport({width:400,height:720,deviceScaleFactor:1});
    if (tag === 'trecho') {
      await page.goto({url:'http://localhost:3021/Entre-a-Taca-e-a-Degola-EP01',timeout:30000});
      await page.evaluate(()=>new Promise(resolve=>setTimeout(resolve,1200)));
      const studio = await page._client().send('Page.captureScreenshot',{format:'png'});
      fs.writeFileSync(path.join(resultDir,'Studio-Montagem.png'),Buffer.from(studio.value.data,'base64'));
      console.log('Studio da montagem carregado.');
    }
    await page.goto({url:`http://127.0.0.1:${server.address().port}`,timeout:30000});
    heartbeat = setInterval(()=>console.log('Reprodução de verificação em andamento.'),10000);
    const playback = await page.evaluate(async () => {
      const v = document.getElementById('film');let mutedFallback=false;
      try {await v.play();} catch {v.muted=true;mutedFallback=true;await v.play();}
      await new Promise((resolve,reject)=>{v.addEventListener('ended',resolve,{once:true});v.addEventListener('error',()=>reject(new Error(v.error?.message)),{once:true});setTimeout(()=>reject(new Error('Playback timeout')),85000);});
      const q=v.getVideoPlaybackQuality();return {ended:v.ended,currentTime:v.currentTime,duration:v.duration,muted:v.muted,mutedFallback,totalVideoFrames:q.totalVideoFrames,droppedVideoFrames:q.droppedVideoFrames,videoWidth:v.videoWidth,videoHeight:v.videoHeight,subjectiveListening:false};
    });
    clearInterval(heartbeat);
    fs.writeFileSync(path.join(resultDir,'playback.json'),JSON.stringify(playback,null,2));
    const shot=await page._client().send('Page.captureScreenshot',{format:'png'});
    fs.writeFileSync(path.join(resultDir,'Ultimo-Quadro-Navegador.png'),Buffer.from(shot.value.data,'base64'));
    console.log(JSON.stringify({file:input,duration,decode:'passed',loudness:loud.input_i,truePeak:loud.input_tp,playback},null,2));
  } finally {clearInterval(heartbeat);await browser.close({silent:true});server.close();}
})().catch(e=>{console.error(e);process.exit(1);});
