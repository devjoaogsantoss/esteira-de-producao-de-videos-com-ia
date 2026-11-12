import React from 'react';
import {AbsoluteFill,Sequence,staticFile,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {C,Season,Comparison,Samples,Tactics,Context,Closing} from './Design';
import {ArtContext,AudioProgressContext,SceneMotion} from './Motion';
import {ArtCover,ArtHook,ArtSelection} from './ArtScenes';
import {PaperCrumple} from './PaperCrumple';
import {AnimatedTimeline} from './AnimatedTimeline';
import {FilmEnding} from './Film';
import timing from './timing-v3.json';
import pulse from './music-pulse-v3.json';

export const FilmV3=({paperTransitions=true}:{paperTransitions?:boolean})=>{
 const {fps}=useVideoConfig();
 return <AudioProgressContext.Provider value={{duration:3690,pulse}}><ArtContext.Provider value={true}><AbsoluteFill style={{background:C.navy}}>
  <Sequence name="01 Capa · nova voz" from={0} durationInFrames={186}><SceneMotion start={0} duration={174} first><ArtCover/></SceneMotion></Sequence>
  <Sequence name="02 Muda a camisa" from={174} durationInFrames={102}><SceneMotion start={174} duration={90}><ArtHook/></SceneMotion></Sequence>
  <Sequence name="03 Temporada parcial" from={264} durationInFrames={366}><SceneMotion start={264} duration={354}><Season/></SceneMotion></Sequence>
  <Sequence name="04 Timeline · nova sincronização" from={618} durationInFrames={689}><SceneMotion start={618} duration={677}><AnimatedTimeline globalStart={618} arrivals={timing.timelineArrivals} groupStarts={timing.timelineGroupStarts}/></SceneMotion></Sequence>
  <Sequence name="05 E na Seleção" from={1295} durationInFrames={280}><SceneMotion start={1295} duration={268}><ArtSelection/></SceneMotion></Sequence>
  <Sequence name="06 Participações por 90" from={1563} durationInFrames={546}><SceneMotion start={1563} duration={534}><Comparison/></SceneMotion></Sequence>
  <Sequence name="07 Média de minutos por jogo" from={2097} durationInFrames={246}><SceneMotion start={2097} duration={234}><Samples/></SceneMotion></Sequence>
  <Sequence name="08 Xavi · ilustração tática" from={2331} durationInFrames={199}><SceneMotion start={2331} duration={187}><Tactics coach="xavi"/></SceneMotion></Sequence>
  <Sequence name="09 Flick · liberdade ofensiva" from={2518} durationInFrames={248}><SceneMotion start={2518} duration={236}><Tactics coach="flick"/></SceneMotion></Sequence>
  <Sequence name="10 Ancelotti · narração acrescentada" from={2754} durationInFrames={390}><SceneMotion start={2754} duration={378}><Context central/></SceneMotion></Sequence>
  <Sequence name="11 Conclusão · disclaimer animado" from={3132} durationInFrames={510}><SceneMotion start={3132} duration={498}><Closing/></SceneMotion></Sequence>
  <Sequence name="12 Assinatura com quique" from={3630} durationInFrames={60}><SceneMotion start={3630} duration={60}><FilmEnding/></SceneMotion></Sequence>
  {paperTransitions&&<Sequence name="Papel amassando · tempos V3" from={0} durationInFrames={123*fps}><PaperCrumple cuts={timing.cuts} folder="paper-v3"/></Sequence>}
  <Sequence name="Mix · nova narração completa" from={0} durationInFrames={123*fps}><Audio src={staticFile('audio/mix-v3.wav')}/></Sequence>
 </AbsoluteFill></ArtContext.Provider></AudioProgressContext.Provider>;
};
