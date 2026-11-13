import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import timing from './ep02-film-timing.json';
import pulse from './ep02-film-music-pulse.json';

export const EP02Progress=({previewScreen,still=false}:{previewScreen?:number;still?:boolean})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const globalFrame=previewScreen===undefined?frame:Math.round(timing.starts[previewScreen]*fps)+(still?30:frame);
 if(previewScreen===undefined&&globalFrame>=timing.endingStartSeconds*fps)return null;
 const p=still&&previewScreen!==undefined?(previewScreen+1)/10:Math.min(1,globalFrame/(timing.durationInFrames-1));
 const energy=Math.pow(pulse[Math.max(0,Math.min(pulse.length-1,globalFrame))]||0,.7);
 return <div data-music-progress style={{position:'absolute',left:90,top:1560,width:810,fontFamily:'Poppins'}}>
  <div style={{height:43,textAlign:'right',fontSize:31,fontWeight:600,color:'#FF0244'}}>{Math.round(p*100)}%</div>
  <div style={{position:'relative',height:92,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
   {Array.from({length:78},(_,i)=>{
    const e=Math.pow(pulse[Math.max(0,Math.min(pulse.length-1,globalFrame-i%4))]||0,.7);
    return <div data-music-bar key={i} style={{width:7,height:10+e*(42+i%5*6),borderRadius:5,background:i/77<=p?'#FF0244':'#43536C',opacity:i/77<=p?1:.8}}/>;
   })}
   <div data-time-cursor style={{position:'absolute',left:p*778,top:30,width:32,height:32,borderRadius:'50%',background:'#EEEEF0',border:'4px solid #FF0244',boxSizing:'border-box',scale:1+energy*.32,boxShadow:'0 0 0 3px #020C1F'}}/>
  </div>
 </div>;
};
