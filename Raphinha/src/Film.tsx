import React from 'react';
import {AbsoluteFill,Img,Sequence,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {C,Cover,Hook,Season,Selection,Comparison,Samples,Tactics,Context,Closing} from './Design';
import {ArtContext,SceneMotion,reveal} from './Motion';
import {ArtCover,ArtHook,ArtSelection} from './ArtScenes';
import {PaperCrumple} from './PaperCrumple';
import {AnimatedTimeline} from './AnimatedTimeline';
import {SportsBall} from './SportsBall';

const EndingBall=({kind,delay}:{kind:0|1|2;delay:number})=>{
 const f=useCurrentFrame()-delay;
 return <div style={{position:'absolute',left:395+kind*115,top:760+interpolate(f,[0,9,15,22,29,33],[0,170,100,170,150,170],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(f,[0,3,26,31],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:`${f*5}deg`,width:64,height:64}}><SportsBall kind={kind}/></div>;
};
export const FilmEnding=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig();
 return <AbsoluteFill data-artboard style={{background:C.navy,color:C.white,fontFamily:'Poppins'}}>
  <EndingBall kind={0} delay={0}/><EndingBall kind={1} delay={4}/><EndingBall kind={2} delay={8}/>
  <div style={{position:'absolute',left:155,top:870,width:770,opacity:f<30?0:1,translate:`0px ${f<30?0:interpolate(spring({frame:f-30,fps,config:{damping:11,stiffness:230,mass:.65}}),[0,1],[-170,0])}px`}}><Img src={staticFile('brand/signature.png')} style={{width:'100%'}}/></div>
  <div style={{position:'absolute',left:90,top:1130,width:810,textAlign:'center',fontSize:28,letterSpacing:2,opacity:reveal(f,43,55)}}>INSTAPLAYSSS</div>
 </AbsoluteFill>;
};

export const Film=({artistic=false,paperTransitions=false}:{artistic?:boolean;paperTransitions?:boolean})=>{
 const {fps}=useVideoConfig();
 return <ArtContext.Provider value={artistic}><AbsoluteFill style={{background:C.navy}}>
  <Sequence name="01 Capa · título integral" from={0} durationInFrames={192}><SceneMotion start={0} duration={180} first>{artistic?<ArtCover/>:<Cover/>}</SceneMotion></Sequence>
  <Sequence name="02 Muda a camisa" from={180} durationInFrames={101}><SceneMotion start={180} duration={89}>{artistic?<ArtHook/>:<Hook/>}</SceneMotion></Sequence>
  <Sequence name="03 Temporada parcial" from={269} durationInFrames={378}><SceneMotion start={269} duration={366}><Season/></SceneMotion></Sequence>
  <Sequence name="04 Timeline · bola e acumulados" from={635} durationInFrames={703}><SceneMotion start={635} duration={691}><AnimatedTimeline/></SceneMotion></Sequence>
  <Sequence name="05 E na Seleção" from={1326} durationInFrames={282}><SceneMotion start={1326} duration={270}>{artistic?<ArtSelection/>:<Selection/>}</SceneMotion></Sequence>
  <Sequence name="06 Participações por 90" from={1596} durationInFrames={566}><SceneMotion start={1596} duration={554}><Comparison/></SceneMotion></Sequence>
  <Sequence name="07 Média de minutos por jogo" from={2150} durationInFrames={244}><SceneMotion start={2150} duration={232}><Samples/></SceneMotion></Sequence>
  <Sequence name="08 Xavi · ilustração tática" from={2382} durationInFrames={197}><SceneMotion start={2382} duration={185}><Tactics coach="xavi"/></SceneMotion></Sequence>
  <Sequence name="09 Flick · liberdade ofensiva" from={2567} durationInFrames={241}><SceneMotion start={2567} duration={229}><Tactics coach="flick"/></SceneMotion></Sequence>
  <Sequence name="10 Ancelotti · contexto" from={2796} durationInFrames={237}><SceneMotion start={2796} duration={225}><Context/></SceneMotion></Sequence>
  <Sequence name="11 Conclusão · disclaimer animado" from={3021} durationInFrames={531}><SceneMotion start={3021} duration={519}><Closing/></SceneMotion></Sequence>
  <Sequence name="12 Assinatura original com quique" from={3540} durationInFrames={60}><SceneMotion start={3540} duration={60}><FilmEnding/></SceneMotion></Sequence>
  {artistic&&paperTransitions&&<Sequence name="Papel amassando · trocas de cena" from={0} durationInFrames={120*fps}><PaperCrumple/></Sequence>}
  <Sequence name="Mix · voz em primeiro plano" from={0} durationInFrames={120*fps}><Audio src={staticFile('audio/mix-v1.wav')}/></Sequence>
 </AbsoluteFill></ArtContext.Provider>;
};
