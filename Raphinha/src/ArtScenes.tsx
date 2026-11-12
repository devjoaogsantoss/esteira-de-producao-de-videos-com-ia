import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {C,Shell,Text,Heading} from './Design';
import {PhotoCard} from './ArtMotion';
import {reveal} from './Motion';

const Burst=({frame}:{frame:number})=> <svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <defs><pattern id="comic-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3" fill="#EEEEF0" opacity=".18"/></pattern>
 <filter id="comic-cutout" x="-20%" y="-20%" width="140%" height="140%"><feComponentTransfer in="SourceGraphic" result="ink"><feFuncA type="discrete" tableValues="0 0 1 1"/></feComponentTransfer><feMorphology in="ink" operator="dilate" radius="4" result="edge"/><feFlood floodColor="#EEEEF0" result="paper"/><feComposite in="paper" in2="edge" operator="in" result="outline"/><feMerge><feMergeNode in="outline"/><feMergeNode in="ink"/></feMerge></filter></defs>
 <ellipse cx="690" cy="1120" rx="500" ry="450" fill="url(#comic-dots)"/>
 <g style={{transformOrigin:'650px 1130px',rotate:`${interpolate(reveal(frame,0,85),[0,1],[-9,4])}deg`}}>
  <path d="M205 1040 340 994 272 832 462 920 505 730 603 912 750 760 745 953 961 887 857 1063 1050 1130 860 1210 997 1393 787 1353 777 1539 630 1397 473 1555 455 1361 249 1425 346 1248 142 1180 330 1134Z" fill="#FF0244" opacity=".7"/>
  <path d="M306 1030 425 1010 396 895 517 960 566 848 624 987 755 875 724 1045 909 1008 802 1124 932 1210 768 1248 817 1400 659 1332 549 1460 510 1310 344 1373 412 1224 252 1150 420 1122Z" fill="#07162B"/>
 </g>
 <g stroke="#EEEEF0" strokeWidth="7" strokeLinecap="round" opacity={reveal(frame,5,12)}><path d="M100 828l80 48M92 915l98 15M910 760l-30 79M970 819l-61 51"/></g>
</svg>;

export const ArtCover=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 const title=spring({frame:f,fps,config:{damping:9,stiffness:240,mass:.65}}),actor=spring({frame:Math.max(0,f-3),fps,config:{damping:11,stiffness:180,mass:.8}});
 const second=reveal(f,43,52)*(1-reveal(f,54,68));
 const heroScale=.82+.18*actor+.045*second;
 return <Shell kicker="INSTAPLAYSSS / ESPECIAL RAPHINHA" note="Barcelona × Brasil · desde 2023/24">
  <Burst frame={f}/>
  <div style={{position:'absolute',left:110,top:310,width:770,transformOrigin:'385px 110px',scale:.87+.13*title+.018*second,rotate:`${interpolate(title,[0,1],[-3.5,0])-.6*second}deg`}}>
   <div style={{fontSize:106,lineHeight:1.02,fontWeight:700,letterSpacing:-3,textShadow:'6px 7px 0 #0008'}}>O <span style={{color:C.pink,WebkitTextStroke:'1px #FF0244'}}>PARADOXO</span></div>
   <div style={{fontSize:98,lineHeight:1.12,fontWeight:700,letterSpacing:-3,textShadow:'5px 6px 0 #0008'}}>DE RAPHINHA:</div>
   <svg width="730" height="20" style={{marginTop:8}}><path d="M0 10Q370 0 725 8" pathLength="1" strokeDasharray="1" strokeDashoffset={1-reveal(f,10,28)} fill="none" stroke={C.pink} strokeWidth="9"/></svg>
  </div>
  <div style={{position:'absolute',left:100,top:592,width:790,height:207,background:C.white,boxShadow:'10px 12px 0 #FF0244',rotate:`${interpolate(reveal(f,0,23),[0,1],[2,-1])}deg`,padding:'18px 26px',clipPath:'polygon(0 2%,98% 0,100% 97%,1% 100%)'}}>
   <div data-safe style={{fontSize:43,fontWeight:600,lineHeight:1.28,color:C.navy}}>por que o protagonismo<br/>do Barça não se repete<br/>na Seleção?</div>
  </div>
  <div style={{position:'absolute',inset:0,transformOrigin:'650px 1130px',scale:heroScale,translate:`${interpolate(actor,[0,1],[85,0])}px ${interpolate(actor,[0,1],[80,0])-second*12}px`,rotate:`${interpolate(actor,[0,1],[9,0])}deg`}}>
   <Img src={staticFile('photos/raphinha-portrait.png')} style={{position:'absolute',left:302,top:840,width:700,height:825,objectFit:'contain',filter:'url(#comic-cutout) drop-shadow(0 12px 15px #0007)',maskImage:'linear-gradient(black 55%,transparent 91%)'}}/>
  </div>
  <div style={{position:'absolute',left:100,top:1070,width:265,padding:'13px 18px',background:C.white,color:C.navy,fontSize:34,fontWeight:700,lineHeight:1.18,rotate:'-6deg',boxShadow:'8px 9px 0 #FF0244',scale:.92+.08*reveal(f,21,35)}}>BARÇA.<br/>BRASIL.<br/><span style={{color:C.pink}}>PARADOXO.</span></div>
  <svg width="220" height="150" style={{position:'absolute',left:132,top:1225}}><path d="M12 6Q-10 97 153 94m-27-17 30 19-31 18" pathLength="1" strokeDasharray="1" strokeDashoffset={1-reveal(f,23,50)} fill="none" stroke={C.white} strokeWidth="5" strokeLinecap="round"/></svg>
  <div style={{position:'absolute',left:0,top:1340,width:1080,height:580,background:'linear-gradient(transparent,#020C1F 24%,#020C1F)'}}/>
 </Shell>;
};

export const ArtHook=()=>{
 const f=useCurrentFrame();
 return <Shell chapter={1} note="Uma pergunta · dois contextos">
  <Heading first="MUDA A CAMISA." second="E O IMPACTO?" size={96}/>
  <PhotoCard name="barcelona-action" x={100} y={650} w={380} h={650} focus="54% 35%" angle={-4} label="BARCELONA"/>
  <PhotoCard name="brasil-action" x={515} y={650} w={380} h={650} focus="44% 30%" angle={4} label="BRASIL" at={.12}/>
  <svg width="150" height="100" style={{position:'absolute',left:423,top:960,translate:`${Math.sin(f/11)*7}px 0px`,filter:'drop-shadow(0 5px 4px #0009)'}}><path d="M15 32h110l-23-20m23 20-23 20M130 75H20l23-20m-23 20 23 20" fill="none" stroke={C.pink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </Shell>;
};

export const ArtSelection=()=> <Shell chapter={4} note="Barcelona × Brasil · pergunta editorial">
 <Heading first="E NA" second="SELEÇÃO?" size={115}/>
 <PhotoCard name="brasil-action" x={105} y={660} w={780} h={695} focus="43% 34%" angle={-1.6} label="O MESMO RAPHINHA?"/>
</Shell>;
