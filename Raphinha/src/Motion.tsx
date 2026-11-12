import React,{createContext,useContext} from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import pulse from './music-pulse.json';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const reveal=(frame:number,from:number,to:number)=>interpolate(frame,[from,to],[0,1],{...clamp,easing:Easing.bezier(.22,1,.36,1)});
export const MotionContext=createContext({enabled:false,start:0,duration:1,totalDuration:3600,preserveFirst:false});
export const AudioProgressContext=createContext({duration:3600,pulse:pulse as number[]});
export const ArtContext=createContext(false);
export const useArtistic=()=>useContext(ArtContext);
export const useMotion=()=>useContext(MotionContext);
export const SceneMotion=({children,start,duration,first=false}:{children:React.ReactNode;start:number;duration:number;first?:boolean})=>{
 const f=useCurrentFrame(),artistic=useArtistic(),audio=useContext(AudioProgressContext);
 return <MotionContext.Provider value={{enabled:true,start,duration,totalDuration:audio.duration,preserveFirst:first}}><AbsoluteFill style={{opacity:first||artistic?1:reveal(f,0,11)}}>{children}</AbsoluteFill></MotionContext.Provider>;
};
export const MotionLayer=({children,at=0,style={}}:{children:React.ReactNode;at?:number;style?:React.CSSProperties})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),motion=useMotion();
 return <div style={{...style,opacity:motion.enabled?reveal(f,at*fps,at*fps+12):1,translate:motion.enabled?`0px ${interpolate(reveal(f,at*fps,at*fps+16),[0,1],[18,0])}px`:'0px 0px'}}>{children}</div>;
};
export const NumberReveal=({value,at=0,duration=.8}:{value:number;at?:number;duration?:number})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),motion=useMotion();
 return <>{motion.enabled?Math.round(interpolate(f,[at*fps,(at+duration)*fps],[0,value],clamp)):value}</>;
};
export const MusicProgress=({chapter}:{chapter:number})=>{
 const f=useCurrentFrame(),motion=useMotion(),audio=useContext(AudioProgressContext);
 const global=motion.start+f,progress=Math.min(1,global/Math.max(1,motion.totalDuration-1));
 const energy=audio.pulse[Math.max(0,Math.min(audio.pulse.length-1,global))]??0;
 return <>
  <div style={{position:'absolute',left:90,top:1585,width:810,display:'flex',justifyContent:'space-between',alignItems:'center',color:'#BEC8D6',fontSize:25,letterSpacing:1}}><span>INSTAPLAYSSS / SPORTSMATCH</span><span style={{color:'#FF0244'}}>{motion.enabled?`${Math.round(progress*100)}%`:`0${chapter} / 08`}</span></div>
  <div style={{position:'absolute',left:90,top:1640,width:810,height:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>{Array.from({length:64},(_,i)=><div key={i} style={{width:5,height:motion.enabled?5+energy*(6+i%5):(i%4===0?9:5),borderRadius:3,background:i/63<(motion.enabled?progress:chapter/8)?'#FF0244':'#34445D'}}/>)}</div>
 </>;
};
