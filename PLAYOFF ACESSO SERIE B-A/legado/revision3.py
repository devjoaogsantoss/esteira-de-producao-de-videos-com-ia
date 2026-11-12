from pathlib import Path
p=Path('build.py').read_text().replace('entrega','render3').replace("regular.ttf',s)", "regular.ttf',round(s*1.12))").replace("Regular.ttf',s)", "Regular.ttf',round(s*1.12))")
exec(compile(p,'build3','exec'))
s=Path('animate_v2.py').read_text().replace('entrega/','render3/').replace('video_work','motion3').replace('Playoff_SerieB_2026_Animado_v2.mp4','motion3/silent.mp4').replace('from PIL import Image,','from PIL import ImageChops,Image,')
s=s.replace(' layers=[(r,final.crop(r[:4])) for r in regions[j]]', ''' layers=[]
 for x,y,x2,y2,start in regions[j]:
  if x2>=920:x2=1080
  if y==725:y=710
  r=(x,y,x2,y2,start);layer=final.crop(r[:4])
  mask=ImageChops.difference(layer,bg.crop(r[:4])).convert('L').point(lambda a:255 if a else 0)
  layers.append((r,layer,mask))''')
a=s.index('  for r,layer in layers:');b=s.index('  dr=ImageDraw',a)
s=s[:a]+'''  for i,(r,layer,mask) in enumerate(layers):
   u=min(1,max(0,(t-r[4]*.50+.09)/.28))
   v=min(1,max(0,(t-(dur-.36+i*.012))/.22))
   if u<=0 or v>=1:continue
   if u==1 and v==0:frame.paste(layer,(r[0],r[1]),mask);continue
   z=u-1;overshoot=1+2.35*z**3+1.35*z**2
   dx=round((1-overshoot)*(-54 if i%2==0 else 54)+55*v*v)
   frame.paste(layer,(r[0]+dx,r[1]-round(13*v*v)),mask.point(lambda a:round(a*min(1,u*2)*(1-v))))
'''+s[b:];s=s.replace('if t<.3:', 'if False:');exec(compile(s,'animate3','exec'))
