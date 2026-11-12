import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {reveal,useArtistic,useMotion} from './Motion';
import {SportsBall} from './SportsBall';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;

export const PaperGrain=()=> <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:.075,pointerEvents:'none'}}><defs><filter id="papergrain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="17" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="1080" height="1920" fill="#eeeeF0" filter="url(#papergrain)"/></svg>;

export const ArtActor=({children,x=310,y=1080}:{children:React.ReactNode;x?:number;y?:number})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),art=useArtistic();
 if(!art)return <>{children}</>;
 const entrance=spring({frame:f,fps,config:{damping:12,stiffness:150,mass:.8}});
 return <AbsoluteFill style={{transformOrigin:`${x}px ${y}px`,translate:`${interpolate(entrance,[0,1],[-105,0])}px ${interpolate(entrance,[0,1],[45,0])+Math.sin(f/35)*6}px`,scale:.8+.2*entrance+Math.sin(f/70)*.012,rotate:`${interpolate(entrance,[0,1],[-9,0])+Math.sin(f/65)*.7}deg`}}>{children}</AbsoluteFill>;
};

export const PhotoCard=({name,x,y,w,h,focus='50% 40%',label,angle=-2,at=0,zoom=1.03,panY=0}:{name:string;x:number;y:number;w:number;h:number;focus?:string;label?:string;angle?:number;at?:number;zoom?:number;panY?:number})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),motion=useMotion();
 const local=Math.max(0,f-at*fps),p=spring({frame:local,fps,config:{damping:13,stiffness:150,mass:.7}}),visible=reveal(f,at*fps,at*fps+7);
 const drift=Math.min(1,f/Math.max(1,motion.duration));
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,padding:8,background:'#EEEEF0',boxShadow:'12px 18px 0 #0004,0 20px 45px #0007',rotate:`${angle+interpolate(p,[0,1],[angle*1.8,0])+Math.sin(f/60)*.45}deg`,translate:`${interpolate(p,[0,1],[angle<0?-100:100,0])}px ${interpolate(p,[0,1],[80,0])}px`,scale:.89+.11*p,opacity:visible,clipPath:'polygon(0% 1%,20% 0%,43% 1%,66% 0%,83% 1%,100% 0%,99% 28%,100% 53%,99% 75%,100% 99%,74% 100%,47% 99%,23% 100%,0% 99%,1% 73%,0% 46%,1% 21%)'}}>
  <div style={{width:'100%',height:label?'calc(100% - 75px)':'100%',overflow:'hidden',background:'#020c1f'}}><Img src={staticFile(`photos/${name}.png`)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:focus,scale:zoom+.08*drift,translate:`${Math.sin(f/100)*8}px ${panY-6*drift}px`}}/></div>
  {label&&<div data-safe style={{position:'absolute',left:22,right:15,bottom:15,fontFamily:'Poppins',fontWeight:700,color:'#020C1F',fontSize:39,lineHeight:1.1}}>{label}</div>}
 </div>;
};

export const GoalAndPass=()=>{
 const f=useCurrentFrame();
 const kick=reveal(f,12,69),impact=reveal(f,68,72)*(1-reveal(f,80,92));
 const x=interpolate(kick,[0,1],[315,650]),y=1300-470*kick-130*Math.sin(kick*Math.PI);
 const passing=reveal(f,93,129);
 return <>
  {f<84&&<div style={{position:'absolute',left:x-28,top:y-28,width:56,height:56,rotate:`${kick*700}deg`,opacity:reveal(f,8,14)*(1-reveal(f,70,82)),filter:'drop-shadow(0 7px 7px #0007)'}}><SportsBall size={56}/></div>}
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   <g stroke="#FF0244" strokeWidth="5" opacity={impact}>{Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return <path key={i} d={`M${650+Math.cos(a)*65} ${815+Math.sin(a)*65}L${650+Math.cos(a)*100} ${815+Math.sin(a)*100}`}/>;})}</g>
   <path d="M310 1090Q440 1000 580 1040" pathLength="1" strokeDasharray="1" strokeDashoffset={1-passing} stroke="#EEEEF0" strokeWidth="4" fill="none" opacity={reveal(f,90,97)*(1-reveal(f,155,175))}/>
   <path d="M561 1018l22 24-33 6" stroke="#EEEEF0" strokeWidth="4" fill="none" opacity={reveal(f,123,134)*(1-reveal(f,155,175))}/>
  </svg>
 </>;
};

export const AttackDiagram=({x,duo}:{x:number;duo:boolean})=>{
 const f=useCurrentFrame(),art=useArtistic(),p=art?reveal(f,25,80):1;
 const rx=duo?interpolate(p,[0,1],[192,130]):192,vx=interpolate(p,[0,1],[192,255]);
 return <svg style={{position:'absolute',left:x,top:1135,width:385,height:180}} viewBox="0 0 385 180" role="img" aria-label={duo?'Ilustração: Raphinha em dupla com Vini Jr.':'Ilustração: Raphinha sem dupla fixa'}>
  <rect x="2" y="15" width="381" height="160" fill="#0B1A30" stroke="#34445D" strokeWidth="2"/><path d="M140 15v45h105V15M165 15V4h55v11" fill="none" stroke="#34445D" strokeWidth="2"/>
  {duo&&<path d={`M${rx+29} 115H${vx-29}`} stroke="#BEC8D6" strokeWidth="3" strokeDasharray="5 5" opacity={p}/>}
  <g style={{translate:art?`0px ${interpolate(p,[0,1],[24,0])}px`:'0px 0px'}}><circle cx={rx} cy="115" r="25" fill="#FF0244"/><text x={rx} y="125" textAnchor="middle" fontSize="27" fill="#EEEEF0" fontWeight="700">R</text></g>
  {duo&&<g opacity={p}><circle cx={vx} cy="115" r="25" fill="#EEEEF0"/><text x={vx} y="125" textAnchor="middle" fontSize="24" fill="#020C1F" fontWeight="700">VJ</text></g>}
 </svg>;
};
