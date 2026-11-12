import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {Screen, names} from '../shared/RevisedScreen';

const GalleryPlayer = () => {
  const [screen, setScreen] = useState(0);
  return <div className="interactive">
    <div className="viewer"><Player key={screen} component={Screen} inputProps={{screen, animated: true}} compositionWidth={1080} compositionHeight={1920} durationInFrames={180} fps={30} controls loop style={{width: '100%'}}/></div>
    <div className="choose"><h2>Veja o movimento</h2><p>Selecione a tela e pressione ▶. Cada estudo dura 6 segundos.</p><label htmlFor="scene">Tela</label><select id="scene" value={screen} onChange={e => setScreen(Number(e.target.value))}>{names.map((name, i) => <option key={name} value={i}>{String(i + 1).padStart(2, '0')} · {name.replaceAll('-', ' ')}</option>)}</select><p>Prévia visual sem áudio. Os tempos serão ajustados à locução depois da aprovação.</p><p className="note">Nas timelines, os trechos tracejados fora do Z4 são esquemáticos. Os pontos no Z4 seguem as rodadas informadas.</p></div>
  </div>;
};
createRoot(document.getElementById('player')!).render(<GalleryPlayer/>);
