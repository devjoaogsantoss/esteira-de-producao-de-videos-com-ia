from PIL import Image,ImageDraw,ImageOps
import subprocess,os
os.makedirs('video_work',exist_ok=True)
photos=['WhatsApp-Image-2026-09-12-at-14.23.56-e1789233906982-821x1024.jpeg.png','i.s3.glbimg (16).png','novxcui-rdd28-brb26-09-scaled.png','cenário de fundo.png']
# Each rectangle retains the exact approved typography and layout.
regions=[[(80,230,920,610,0.2),(80,635,920,790,1.1),(80,830,920,1050,2),(80,1070,490,1380,3),(500,1070,920,1380,3.5),(80,1400,930,1480,4.1)],[(80,230,920,610,.2),(80,630,920,790,1),(80,840,920,1070,2),(80,1100,920,1330,3.5),(80,1370,930,1470,4.8)],[(80,230,920,610,.2),(80,620,920,700,.8),(80,725,920,945,1.5),(80,975,930,1035,2.5),(80,1040,920,1200,3),(80,1210,920,1370,4),(80,1400,950,1500,.8)],[(80,230,920,610,.2),(80,620,930,760,1),(80,790,950,840,1.8),(80,850,920,1035,2.5),(80,1035,920,1220,4.5),(80,1220,920,1405,6.5),(80,1410,950,1480,7.3)]]
regions[2]=[(80,230,930,610,.2),(80,620,930,700,.8),(80,710,930,960,1.5),(80,975,930,1035,2.5),(80,1040,930,1210,3),(80,1210,930,1380,4),(80,1400,950,1500,.8)]
regions[3]=[(80,230,930,610,.2),(80,620,930,760,1),(80,780,950,835,1.8),(80,840,930,940,2.5),(80,950,930,1050,3.5),(80,1060,930,1160,4.5),(80,1180,930,1410,5.5),(80,1410,950,1480,6.3)]
durations=[9,9,10,12]
for j,dur in enumerate(durations):
 final=Image.open(f'entrega/tela_{j+1:02d}.png').convert('RGB')
 bg=Image.open(f'entrega/bg_{j+1}.png').convert('RGB')
 bg.paste(final.crop((0,0,1080,225)),(0,0));bg.paste(final.crop((0,1500,1080,1920)),(0,1500))
 layers=[(r,final.crop(r[:4])) for r in regions[j]]
 proc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','20','-pix_fmt','yuv420p','-threads','4',f'video_work/scene{j}.mp4'],stdin=subprocess.PIPE)
 for k in range(dur*30):
  t=k/30;frame=bg.copy()
  for r,layer in layers:
   a=max(0,min(1,(t-r[4])/.5));ease=1-(1-a)**3
   if a:
    mask=Image.new('L',layer.size,int(255*ease));frame.paste(layer,(r[0],r[1]+int((1-ease)*22)),mask)
  dr=ImageDraw.Draw(frame);dr.rectangle((90,1800,900,1804),fill='#19253A');dr.rectangle((90,1800,90+int(810*(sum(durations[:j])+t)/40),1804),fill='#FF0244')
  if t<.3:frame=Image.blend(Image.new('RGB',frame.size,'#020C1F'),frame,t/.3)
  if t>dur-.3:frame=Image.blend(frame,Image.new('RGB',frame.size,'#020C1F'),(t-dur+.3)/.3)
  proc.stdin.write(frame.tobytes())
 proc.stdin.close();assert proc.wait()==0;print('Scene',j+1,'done',flush=True)
open('video_work/list.txt','w').write(''.join(f"file 'scene{j}.mp4'\n" for j in range(4)))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i','video_work/list.txt','-c','copy','-movflags','+faststart','Playoff_SerieB_2026_Animado_v2.mp4'],check=True)
