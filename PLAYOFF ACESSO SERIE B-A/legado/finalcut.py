from PIL import Image,ImageDraw,ImageFont,ImageOps
import numpy as np,subprocess,glob
from pathlib import Path
W,H=1080,1920
def photo(pattern,size,center):
 return ImageOps.fit(Image.open(glob.glob('upload/'+pattern)[0]).convert('RGB'),size,centering=center)
cover=Image.new('RGB',(W,H),'#020C1F')
cover.paste(photo('WhatsApp-Image*',(680,1050),(.5,.40)),(0,0))
right=photo('novxcui*',(700,1050),(.50,.40))
y,x=np.mgrid[:1050,:700];mask=Image.fromarray(np.uint8(np.clip((x-163+y*.18)/115,0,1)*255))
cover.paste(right,(380,0),mask)
trophy=photo('i.s3*',(1080,700),(.5,.5));cover.paste(trophy,(0,950))
rows=np.arange(H);shade=np.interp(rows,[0,240,470,740,950,1050,1300,1650,1920],[.18,.05,.07,.53,.96,.91,.94,1,1])
cover=Image.composite(Image.new('RGB',cover.size,'#020C1F'),cover,Image.fromarray(np.uint8(np.tile(shade[:,None],(1,W))*255)))
d=ImageDraw.Draw(cover)
def title(t,y,s,c):d.text((84,y),t,font=ImageFont.truetype('assets/Poppins-Bold.ttf',s),fill=c,anchor='lt')
d.rounded_rectangle((86,798,185,806),4,fill='#FF0244');title('GUIA DO ACESSO   /   2026',835,32,'#EEEEF0')
title('TUDO O QUE VOCÊ',938,83,'#EEEEF0');title('PRECISA SABER',1045,92,'#EEEEF0');title('SOBRE O PLAYOFF',1162,86,'#EEEEF0');title('DA SÉRIE B',1274,121,'#FF0244')
logo=Image.open('upload/Logo-Horizontal.png').convert('RGBA');logo=logo.crop(logo.getbbox());logo.thumbnail((390,120));cover.paste(logo,(86,1600),logo);cover.save('Capa_Playoff.png')
audio=glob.glob('upload/*.mp3')[0]
sig=np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-ss','10','-i',audio,'-t','42.5','-ar','12000','-ac','1','-f','f32le','-']),dtype='<f4')
win=np.hanning(800);padded=np.pad(sig,(400,800));spec=np.array([np.abs(np.fft.rfft(win*padded[k*400:k*400+800])) for k in range(min(1275,len(sig)//400))]);flux=np.maximum(0,np.diff(np.log1p(spec),axis=0,prepend=spec[:1])).mean(axis=1);pulse=np.zeros(1275)
for k in range(1,len(flux)-1):
 if flux[k]>=max(flux[k-1],flux[k+1]) and flux[k]>max(np.percentile(flux,60),1.5*np.median(flux[max(k-9,0):k+10])):
  for n in range(min(8,1275-k)):pulse[k+n]=max(pulse[k+n],min(1,flux[k]/(np.percentile(flux,96)+1e-8))*np.exp(-n/2.3))
def bar(frame,k):
 dr=ImageDraw.Draw(frame);x=90+round(810*k/1274);a=pulse[k];h=2+round(3*a);dr.rounded_rectangle((90,1799,900,1803),2,fill='#283951');dr.rounded_rectangle((90,1801-h,max(91,x),1801+h),h,fill='#FF0244');r=3+round(3*a);dr.ellipse((x-r,1801-r,x+r,1801+r),fill='#FF426F')
subprocess.run(['mkdir','-p','motion4'])
proc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','-','-c:v','libx264','-threads','4','-preset','fast','-crf','20','-pix_fmt','yuv420p','motion4/intro.mp4'],stdin=subprocess.PIPE)
for k in range(75):
 frame=cover.copy();bar(frame,k);proc.stdin.write(frame.tobytes())
proc.stdin.close();assert proc.wait()==0
rev=Path('revision3.py').read_text().replace('render3','render4').replace('motion3','motion4')
rev=rev.replace("exec(compile(p,'build3','exec'))", """p=p.replace("text(90,1550,'Fotos fornecidas • uso ilustrativo',23)","pass").replace("text(90,635,'SIMULAÇÃO • DATA A CONFIRMAR',27,pink,True)","pass").replace("text(90,1410,'Cenário fornecido no briefing.\\\\nNão representa classificação verificada.',27);save(3)","save(3)").replace("COMO FICARIA\\\\nNESTE\\\\nCENÁRIO?", "SE A SÉRIE B\\\\nTERMINASSE\\\\nASSIM…")
assert 'Não representa classificação verificada' not in p
exec(compile(p,'build4','exec'))""")
rev=rev.replace("exec(compile(s,'animate3','exec'))","s=s[:s.index('  dr=ImageDraw')]+ '  bar(frame,75+sum(durations[:j])*30+k)\\n'+s[s.index('  if False:'):];s=s.replace(\"''.join(f\\\"file 'scene\",\"\\\"file 'intro.mp4'\\\\n\\\"+''.join(f\\\"file 'scene\");exec(compile(s,'animation','exec'))")
exec(rev)
