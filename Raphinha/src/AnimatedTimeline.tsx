import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {C,Shell,Heading,Text,GoalIcon,AssistIcon} from './Design';
import {matches,groups} from './data';
import {SportsBall} from './SportsBall';
import {reveal} from './Motion';

// Tempos globais após a pausa instrumental de 2s inserida em 27,8s da voz.
const defaultArrivals=[21.55,22.3,23.2,25.3,26.05,27,30.5,31.3,35.8,36.6,37.4];
const defaultGroupStarts=[21.1667,24.95,29.95,35];
export const AnimatedTimeline=({globalStart=635,arrivals=defaultArrivals,groupStarts=defaultGroupStarts}:{globalStart?:number;arrivals?:number[];groupStarts?:number[]})=>{
 const local=useCurrentFrame(),{fps}=useVideoConfig(),global=local+globalStart;
 let group=0;for(let i=1;i<4;i++)if(global>=Math.round(groupStarts[i]*fps))group=i;
 const [start,end]=groups[group],visible=matches.slice(start,end),xs=visible.length===2?[300,690]:[220,495,770];
 const active=arrivals.reduce((a,t,i)=>global>=Math.round(t*fps)?i:a,-1);
 const total=matches.slice(0,active+1).reduce((a,m)=>({goals:a.goals+m.goals,assists:a.assists+m.assists}),{goals:0,assists:0});
 const next=Math.min(end-1,Math.max(start,active+1));
 const travelling=active<end-1;
 const target=travelling?next:Math.max(start,active),index=Math.min(xs.length-1,target-start);
 const p=travelling?reveal(global,Math.round(arrivals[target]*fps)-13,Math.round(arrivals[target]*fps)):1;
 const from=index===0?xs[0]-85:xs[index-1],to=xs[index];
 const ballX=travelling?interpolate(p,[0,1],[from,to]):xs[xs.length-1];
 const ballY=1008-(travelling?Math.sin(p*Math.PI)*36:0);
 const gf=global-Math.round(groupStarts[group]*fps),page=reveal(gf,0,10);
 return <Shell chapter={3} kicker="BARCELONA / SEQUÊNCIA DAS PARTIDAS · 2026" note="11 partidas listadas · calendário incompleto">
  <Heading first={group===2?'DOIS JOGOS.':'A LISTA'} second={group===2?'DOIS HAT-TRICKS.':'CRESCE.'} size={group===2?86:106}/>
  <Text y={568} size={28} weight={600} color={C.muted}>ACUMULADO NAS PARTIDAS LISTADAS</Text>
  <Text y={615} w={350} size={151} weight={700} color={C.pink} line={1}>{String(total.goals).padStart(2,'0')}</Text>
  <Text y={765} w={350} size={33} weight={600}>GOLS</Text>
  <Text x={530} y={615} w={370} size={151} weight={700} line={1}>{String(total.assists).padStart(2,'0')}</Text>
  <Text x={530} y={765} w={370} size={33} weight={600}>ASSISTÊNCIAS</Text>
  <svg style={{position:'absolute',top:1020,left:90}} width="810" height="40"><path d="M0 20H810" stroke={C.line} strokeWidth="3"/><path d={`M0 20H${Math.max(0,ballX-90)}`} stroke={C.pink} strokeWidth="3"/></svg>
  {visible.map((m,i)=>{
   const done=global>=Math.round(arrivals[start+i]*fps),event=reveal(global,Math.round(arrivals[start+i]*fps)-5,Math.round(arrivals[start+i]*fps)+9);
   return <div key={m.name} style={{opacity:page,translate:`0px ${interpolate(page,[0,1],[10,0])}px`}}>
    <Text x={xs[i]-125} y={885} w={250} size={37} weight={600} line={1.2} style={{textAlign:'center',whiteSpace:'pre-line',color:done?C.white:C.muted}}>{m.name}</Text>
    <div style={{position:'absolute',left:xs[i]-21,top:1019,width:42,height:42,borderRadius:'50%',background:C.navy,border:`3px solid ${done?C.pink:C.line}`}}/>
    <Text x={xs[i]-100} y={1085} w={200} size={38} weight={600} style={{textAlign:'center'}}>{m.date}</Text>
    <div data-safe style={{position:'absolute',left:xs[i]-110,top:1175,width:220,display:'flex',justifyContent:'center',alignItems:'center',gap:12,fontSize:48,fontWeight:700,opacity:.25+.75*event,scale:1+.045*Math.sin(event*Math.PI)}}><GoalIcon/><span>{m.goals}</span><AssistIcon/><span>{m.assists}</span></div>
    {(m.goals===3||m.assists===2)&&<Text x={xs[i]-125} y={1260} w={250} size={28} weight={600} color={C.pink} style={{textAlign:'center',opacity:event}}>{m.goals===3?'HAT-TRICK':'2 ASSISTÊNCIAS'}</Text>}
   </div>;
  })}
  <div style={{position:'absolute',left:ballX-32,top:ballY,width:64,height:64,rotate:`${(ballX-90)*2}deg`,filter:'drop-shadow(0 4px 7px #0007)'}}><SportsBall size={64}/></div>
  <div data-safe style={{position:'absolute',left:90,top:1340,width:810,display:'flex',alignItems:'center',gap:15,fontSize:28,color:C.muted}}><GoalIcon size={32}/><span>Gol</span><AssistIcon size={32}/><span>Assistência</span><span style={{marginLeft:'auto'}}>SEQUÊNCIA {group+1}/4</span></div>
 </Shell>;
};
