from PIL import Image,ImageDraw
from math import sin,cos,pi
import subprocess as sp,glob
logo=Image.open('upload/Logo-Horizontal-White.png').convert('RGBA');logo=logo.crop(logo.getbbox());logo.thumbnail((750,250),Image.Resampling.LANCZOS)
def pent(x,y,r,a):return [(x+r*cos(a+2*pi*i/5),y+r*sin(a+2*pi*i/5)) for i in range(5)]
def ball(i):
 s=192;c=96
 im=Image.new('RGBA',(s,s));d=ImageDraw.Draw(im);d.ellipse((1,1,191,191),fill=['#f08b35','#f6f6f4','#cce850'][i]);mask=im.getchannel('A')
 if i==0:
  for f in [(-108,-25,66,220),(126,-25,300,220)]:d.ellipse(f,outline='#41291e',width=7)
  d.line((0,96,192,96),fill='#41291e',width=7);d.line((96,0,96,192),fill='#41291e',width=7)
 elif i==1:
  pts=pent(c,c,37,-pi/2);d.polygon(pts,fill='#182337')
  for x,y in pts:
   ox,oy=96+2.55*(x-96),96+2.55*(y-96);d.line((x,y,ox,oy),fill='#485364',width=4);d.polygon(pent(ox,oy,24,0),fill='#182337')
 else:
  for f in [(-112,-30,63,221),(129,-30,304,221)]:d.ellipse(f,outline='white',width=10)
 im.putalpha(mask);return im
balls=[ball(i) for i in range(3)]
def encode(name,frames):
 p=sp.Popen(['ffmpeg','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','-','-c:v','libx264','-threads','4','-preset','fast','-crf','20','-pix_fmt','yuv420p',name],stdin=sp.PIPE)
 for f in frames:p.stdin.write(f.convert('RGB').tobytes())
 p.stdin.close();assert p.wait()==0
cover=Image.open('Capa_Playoff.png');encode('motion4/cover1.mp4',[cover]*30)
def frames():
 for k in range(60):
  t=k/30;im=Image.new('RGBA',(1080,1920),'#020C1F')
  for i,asset in enumerate(balls):
   u=t-i*.065
   if not 0<=u<.97:continue
   x=416+124*i;y=945-(1-(u/.38)**2)*154 if u<.38 else 945-(77*max(0,sin(pi*(u-.38)/.37)) if u<.75 else 24*max(0,sin(pi*(u-.75)/.22)))
   b=asset.rotate(-u*125,resample=Image.Resampling.BICUBIC).resize((70,70),Image.Resampling.LANCZOS);b.putalpha(b.getchannel('A').point(lambda a:round(a*min(1,(.97-u)/.16))))
   im.alpha_composite(b,(x-35,round(y)-35))
  if t>=1.04:
   u=t-1.04;yy=960-180*(1-(u/.22)**2) if u<.22 else 960-38*sin(pi*(u-.22)/.23) if u<.45 else 960
   im.alpha_composite(logo,((1080-logo.width)//2,round(yy-logo.height/2)))
  yield im
encode('motion4/end2.mp4',frames())
open('motion4/cut5.txt','w').write(''.join("file '"+p+".mp4'\n" for p in ['cover1','scene0','scene1','scene2','scene3','end2']))
sp.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i','motion4/cut5.txt','-ss','10','-stream_loop','-1','-i',glob.glob('upload/*.mp3')[0],'-map','0:v','-map','1:a','-t','43','-af','loudnorm=I=-16:TP=-1.5:LRA=9,afade=t=out:st=41.8:d=1.2','-c:v','copy','-c:a','aac','-ar','48000','-b:a','192k','-movflags','+faststart','Playoff_SerieB_43s.mp4'],check=True)
