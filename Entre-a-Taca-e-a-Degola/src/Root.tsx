import React from 'react';
import {Composition, Still} from 'remotion';
import {Screen} from '../shared/RevisedScreen';
import {EP01Film} from '../shared/EP01Film';

export const Root = () => <>
  <Still id="EP01-Telas-Aprovacao" component={Screen} width={1080} height={1920} defaultProps={{screen: 0, animated: false}}/>
  <Composition id="EP01-Estudo-Movimento" component={Screen} width={1080} height={1920} fps={30} durationInFrames={180} defaultProps={{screen: 1, animated: true}}/>
  <Composition id="Entre-a-Taca-e-a-Degola-EP01" component={EP01Film} width={1080} height={1920} fps={30} durationInFrames={1791}/>
</>;
