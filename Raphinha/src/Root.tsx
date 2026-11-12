import React from 'react';
import {Composition,Folder, Still} from 'remotion';
import {Film} from './Film';
import {FilmV3} from './FilmV3';
import {Cover,Hook,Season,Timeline,Selection,Comparison,Samples,Tactics,Context,Closing,Ending} from './Design';
export const Root = () => <><Composition id="Raphinha-V3" component={FilmV3} width={1080} height={1920} fps={30} durationInFrames={3690} defaultProps={{paperTransitions:true}}/><Composition id="Raphinha-V2" component={Film} width={1080} height={1920} fps={30} durationInFrames={3600} defaultProps={{artistic:true,paperTransitions:true}}/><Composition id="Raphinha-V1" component={Film} width={1080} height={1920} fps={30} durationInFrames={3600}/><Folder name="Raphinha-Etapa-2">
  <Still id="Raphinha-Capa" component={Cover} width={1080} height={1920}/>
  <Still id="Raphinha-Gancho" component={Hook} width={1080} height={1920}/>
  <Still id="Raphinha-Temporada" component={Season} width={1080} height={1920}/>
  <Still id="Raphinha-Timeline-1" component={Timeline} width={1080} height={1920} defaultProps={{group:0}}/>
  <Still id="Raphinha-Timeline-2" component={Timeline} width={1080} height={1920} defaultProps={{group:1}}/>
  <Still id="Raphinha-Timeline-3" component={Timeline} width={1080} height={1920} defaultProps={{group:2}}/>
  <Still id="Raphinha-Timeline-4" component={Timeline} width={1080} height={1920} defaultProps={{group:3}}/>
  <Still id="Raphinha-Selecao" component={Selection} width={1080} height={1920}/>
  <Still id="Raphinha-Grafico" component={Comparison} width={1080} height={1920}/>
  <Still id="Raphinha-Amostras" component={Samples} width={1080} height={1920}/>
  <Still id="Raphinha-Xavi" component={Tactics} width={1080} height={1920} defaultProps={{coach:'xavi'}}/>
  <Still id="Raphinha-Flick" component={Tactics} width={1080} height={1920} defaultProps={{coach:'flick'}}/>
  <Still id="Raphinha-Contexto" component={Context} width={1080} height={1920}/>
  <Still id="Raphinha-Fechamento" component={Closing} width={1080} height={1920}/>
  <Still id="Raphinha-Assinatura" component={Ending} width={1080} height={1920}/>
</Folder></>;
