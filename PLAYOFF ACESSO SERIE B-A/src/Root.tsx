import React from 'react';
import {Composition, Still} from 'remotion';
import {Film, Cover} from './Sportsmatch';
import timing from './timing.json';
import {TitleStudyG,DirectStudyG,PlayoffStudyG} from './GraphicRevision';
import {GraphicFilm} from './GraphicFilm';

export const Root: React.FC = () => <>
  <Composition id="SerieB2026-Final" component={Film} width={1080} height={1920} fps={30} durationInFrames={timing.duration} defaultProps={{preview:false}} />
  <Composition id="SerieB2026-Revisao" component={Film} width={1080} height={1920} fps={30} durationInFrames={timing.duration} defaultProps={{preview:true}} />
  <Still id="Capa-SerieB2026" component={Cover} width={1080} height={1920} />
  <Still id="Estudo-Titulo-A" component={TitleStudyG} width={1080} height={1920} defaultProps={{variant:'A'}} />
  <Still id="Estudo-Titulo-B" component={TitleStudyG} width={1080} height={1920} defaultProps={{variant:'B'}} />
  <Still id="Estudo-Acesso-Direto" component={DirectStudyG} width={1080} height={1920} />
  <Still id="Estudo-Playoff" component={PlayoffStudyG} width={1080} height={1920} />
  <Composition id="SerieB2026-Grafica-V2" component={GraphicFilm} width={1080} height={1920} fps={30} durationInFrames={1494} />
</>;
