import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {Club, clubs, final, gremioZ4, standings, vascoZ4} from './episode-data';
import {Notebook, WrittenLine} from './Paper';
import {SignatureEnding} from './SignatureEnding';

for (const [weight, file] of [[400, 'Regular'], [600, 'SemiBold'], [700, 'Bold']] as const) {
  loadFont({family: 'Poppins', url: staticFile(`fonts/Poppins-${file}.ttf`), weight: String(weight), format: 'truetype'});
}
const pink = '#FF0244', navy = '#020C1F', paper = '#EEEEF0';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const names = ['Capa', 'Gremio-Caminho', 'Gremio-Z4', 'Gremio-Aproveitamento', 'Gremio-Sintese', 'Vasco-Copas', 'Vasco-Z4', 'Vasco-Posicao', 'Vasco-Aproveitamento', 'Pergunta', 'Assinatura'];
const titles = [[], ['INVICTO ATÉ', 'A FINAL.'], ['NA LIGA,', 'O SUFOCO.'], ['DOIS TORNEIOS.', 'OUTRO GRÊMIO.'], ['PERTO DA TAÇA.', 'DENTRO DO Z4.'], ['VASCO:', 'DUAS SEMIS.'], ['O OUTRO LADO', 'DA CAMPANHA.'], ['FORA DO Z4.', 'MAS PERTO.'], ['NAS COPAS,', 'OUTRO VASCO.'], ['COMO EXPLICAR', 'ESSA DIFERENÇA?']];
const photos = [6, 7, 5, 8, 6, 1, 2, 4, 3, 8];
type Motion = {animated?: boolean; filmMode?: boolean};
const progress = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], clamp);

export const Crest = ({club, size = 76}: {club: Club; size?: number}) => <Img src={staticFile(`episodes/EP01/escudos/${clubs[club].file}.png`)} style={{width: size, height: size, objectFit: 'contain', flexShrink: 0}}/>;
const Card = ({children, style = {}}: {children: React.ReactNode; style?: React.CSSProperties}) => <div style={{boxSizing: 'border-box', width: '100%', background: paper, color: navy, padding: 32, boxShadow: '0 14px 0 #0003', borderTop: `6px solid ${pink}`, ...style}}>{children}</div>;
const Tag = ({children}: {children: React.ReactNode}) => <div style={{fontSize: 28, fontWeight: 600, color: pink, marginBottom: 18}}>{children}</div>;
const Reveal = ({at, children, animated = false}: Motion & {at: number; children: React.ReactNode}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <div style={{opacity: animated ? interpolate(frame, [at * fps, (at + .35) * fps], [0, 1], clamp) : 1, translate: animated ? `0px ${interpolate(frame, [at * fps, (at + .5) * fps], [24, 0], clamp)}px` : '0px 0px'}}>{children}</div>;
};

const Cover = () => <>
  <div style={{position: 'absolute', left: 90, top: 318, width: 810, fontSize: 49, fontWeight: 700}}>GRÊMIO <span style={{color: pink}}>E</span> VASCO</div>
  <div style={{position: 'absolute', left: 90, top: 402, width: 810}}><Notebook height={479} style={{rotate: '-.45deg'}}><div style={{fontWeight: 700, letterSpacing: -4, lineHeight: .99}}><div style={{fontSize: 113}}>LEÕES DE</div><div style={{fontSize: 163, color: pink}}>MATA-</div><div style={{fontSize: 163, color: pink}}>MATA?</div></div></Notebook></div>
  <div style={{position: 'absolute', left: 90, top: 906, width: 810, fontSize: 30, fontWeight: 600}}>Progresso nas Copas × Brasileirão / 2026</div>
  <div style={{position: 'absolute', left: 90, top: 966, width: 810}}>
    <Card style={{padding: '22px 28px', lineHeight: 1.14}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 13, borderBottom: '1px solid #B7BFCA'}}><Crest club="gremio" size={67}/><div><b style={{fontSize: 33}}>GRÊMIO · FINALISTA</b><div style={{fontSize: 28}}>Copa do Brasil</div></div></div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24, paddingTop: 13}}><Crest club="vasco" size={67}/><div><b style={{fontSize: 33}}>VASCO · SEMIFINALISTA</b><div style={{fontSize: 28}}>Copa do Brasil e Sul-Americana</div></div></div>
    </Card>
  </div>
  <div style={{position: 'absolute', left: 90, top: 1206, width: 810, fontSize: 31, fontWeight: 700}}>AMBOS CONTRA O REBAIXAMENTO</div>
  <div style={{position: 'absolute', left: 90, top: 1264, width: 810, background: '#0C1A30', padding: '12px 24px', boxSizing: 'border-box'}}>
    <div style={{fontSize: 27, color: '#BFC9D8', marginBottom: 7}}>BRASILEIRÃO · 34ª RODADA <span style={{float: 'right'}}>PTS</span></div>
    {([{club: 'vasco', position: 13, points: 41}, standings[2]] as typeof standings).map(row => <div key={row.club} style={{height: 54, display: 'flex', alignItems: 'center', gap: 18, borderTop: '1px solid #304056', color: row.club === 'gremio' ? '#FF527F' : paper, fontSize: 31, fontWeight: 600}}><span style={{width: 58}}>{row.position}º</span><span style={{flex: 1}}>{clubs[row.club].name}</span><span style={{fontSize: 25}}>{row.club === 'gremio' ? 'NO Z4' : 'FORA DO Z4'}</span><b>{row.points}</b></div>)}
  </div>
</>;

const CupPath = ({animated = false, filmMode = false}: Motion) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const travel = animated ? progress(f, .5 * fps, 3.4 * fps) : 1;
  const phases: {phase: string; club: Club; note: string}[] = [
    {phase: 'OITAVAS', club: 'mirassol', note: 'ELIMINADO'}, {phase: 'QUARTAS', club: 'internacional', note: 'ELIMINADO'},
    {phase: 'SEMIFINAL', club: 'atletico', note: 'ELIMINADO'}, {phase: 'FINAL', club: final.opponent, note: 'A DISPUTAR'},
  ];
  return <Card><Tag>GRÊMIO / COPA DO BRASIL 2026</Tag><div style={{position: 'relative', paddingLeft: 46}}>
    <div style={{position: 'absolute', left: 14, top: 49, height: 342, width: 4, background: '#B7BFCA'}}/><div style={{position: 'absolute', left: 14, top: 49, height: 342 * travel, width: 4, background: pink}}/>
    {phases.map((row, i) => <Reveal key={row.phase} animated={animated} at={.35 + i * .8}><div style={{position: 'relative', height: 114, display: 'flex', alignItems: 'center', gap: 23}}>
      <div style={{position: 'absolute', left: -42, top: 43, width: 20, height: 20, borderRadius: '50%', background: i === 3 ? paper : pink, border: `3px solid ${pink}`}}/>
      <Crest club={row.club} size={82}/><div style={{flex: 1}}><div style={{fontSize: 27, color: pink, fontWeight: 600}}>{row.phase}</div><b style={{fontSize: 38}}>{clubs[row.club].name}</b></div><span style={{fontSize: 23, fontWeight: 600}}>{row.note}</span>
    </div></Reveal>)}
    <div style={{position: 'absolute', left: -14, top: 20 + 342 * travel, background: paper, borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px #0003'}}><Crest club="gremio" size={50}/></div>
  </div><Reveal animated={animated} at={filmMode ? .05 : 3.35}><div style={{marginTop: 12, padding: '17px 20px', background: navy, color: paper}}><b style={{fontSize: 34}}>{final.date} · {final.venue}</b><div style={{fontSize: 28}}>{final.city} · Final a disputar</div></div></Reveal><div style={{fontSize: 29, fontWeight: 700, marginTop: 21}}>INVICTO ATÉ A DECISÃO</div></Card>;
};

const LeagueTimeline = ({vasco = false, animated = false}: Motion & {vasco?: boolean}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const known = vasco ? vascoZ4 : gremioZ4;
  const reveal = animated ? progress(f, .45 * fps, 4.4 * fps) : 1;
  // Unknown outside ranks are schematic, unnumbered and dashed.
  // The 17–20 numbered band uses only positions supplied by the user.
  const samples = Array.from({length: 34}, (_, i) => {
    const round = i + 1, rank = known[round];
    const outsideY = vasco && round === 28 ? 139 : vasco && round === 34 ? 88 : 92 + 30 * Math.sin(round * .73) + 13 * Math.cos(round * .31);
    return {round, rank, x: 62 + i * (626 / 33), y: rank ? 208 + (rank - 17) * 47 : outsideY};
  });
  const path = samples.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ');
  const cursor = reveal * 33, idx = Math.floor(cursor), a = samples[idx], b = samples[Math.min(idx + 1, 33)], fraction = cursor - idx;
  const cursorX = a.x + (b.x - a.x) * fraction, cursorY = a.y + (b.y - a.y) * fraction;
  return <Card><Tag>{vasco ? 'VASCO' : 'GRÊMIO'} / BRASILEIRÃO 2026</Tag><div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><div><div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.12}}>{Object.keys(known).length}<span style={{fontSize: 42}}> de 34</span></div><div style={{fontSize: 38, fontWeight: 600}}>rodadas no Z4</div></div><Crest club={vasco ? 'vasco' : 'gremio'} size={110}/></div>
    <svg width="746" height="444" viewBox="0 0 746 444" style={{width: '100%', height: 'auto', marginTop: 15, display: 'block'}}>
      <defs><clipPath id={`timeline-${vasco ? 'v' : 'g'}`}><rect width={Math.max(0, 62 + 626 * reveal + 1)} height={410}/></clipPath></defs>
      <rect x="48" y="44" width="660" height="122" fill="#DCE1E8"/><rect x="48" y="184" width="660" height="191" fill="#FFDCE5"/>
      <text x="62" y="31" fill={navy} fontSize="26" fontFamily="Poppins" fontWeight="600">FORA DO Z4</text><text x="655" y="207" fill={pink} fontSize="26" fontFamily="Poppins" fontWeight="700">Z4</text>
      <path d="M48 184H708" stroke={pink} strokeWidth="2" strokeDasharray="7 6"/>
      {[17, 18, 19, 20].map((rank, i) => <g key={rank}><text x="2" y={216 + i * 47} fontFamily="Poppins" fontSize="23" fill={navy}>{rank}º</text><path d={`M48 ${208 + i * 47}H708`} stroke="#B9C0CB" strokeWidth="1"/></g>)}
      <g clipPath={`url(#timeline-${vasco ? 'v' : 'g'})`}>
        <path d={path} fill="none" stroke={navy} strokeWidth="4" strokeLinejoin="round"/>
        {samples.map((p, i) => i < 33 && !p.rank && !samples[i + 1].rank ? <path key={p.round} d={`M${p.x} ${p.y}L${samples[i + 1].x} ${samples[i + 1].y}`} fill="none" stroke={paper} strokeWidth="5" strokeDasharray="4 4"/> : null)}
        {samples.filter(p => p.rank).map(p => <g key={p.round}><path d={`M${p.x} ${p.y}V375`} stroke={pink} opacity=".16"/><circle cx={p.x} cy={p.y} r="6" fill={pink} stroke={paper} strokeWidth="1.5"/></g>)}
      </g>
      <path d={`M${cursorX} 44V375`} stroke={pink} strokeWidth="2" opacity=".5"/><circle cx={cursorX} cy={cursorY} r="27" fill={paper} stroke={pink} strokeWidth="2"/>
      <foreignObject x={cursorX - 24} y={cursorY - 24} width={48} height={48}><Crest club={vasco ? 'vasco' : 'gremio'} size={48}/></foreignObject>
      {[1, 4, 8, 12, 16, 20, 24, 28, 34].map(round => <text key={round} x={62 + (round - 1) * 626 / 33} y="411" textAnchor="middle" fontFamily="Poppins" fontSize="23" fill={navy}>{round}</text>)}
      <text x="708" y="442" textAnchor="end" fontFamily="Poppins" fontSize="22" fill={navy}>RODADA</text>
    </svg>
  </Card>;
};

const Bars = ({vasco = false, animated = false}: Motion & {vasco?: boolean}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <Card><Tag>APROVEITAMENTO / 2026</Tag>{(vasco ? ['Brasileirão', 'Copa do Brasil + Sul-Americana'] : ['Brasileirão', 'Copa do Brasil']).map((label, i) => {
    const amount = vasco ? (i ? 63 : 41) : (i ? 75 : 36.7);
    const p = animated ? progress(f, (i ? 1.5 : .35) * fps, (i ? 3.1 : 1.5) * fps) : 1;
    return <div key={label} style={{marginTop: i ? 42 : 20}}><div style={{fontSize: vasco && i ? 31 : 36, fontWeight: 600}}>{label}</div><div style={{fontSize: 68, fontWeight: 700, lineHeight: 1.35, opacity: animated ? progress(f, (i ? 1.5 : .35) * fps, (i ? 1.85 : .7) * fps) : 1}}>{vasco ? (i ? '63%' : '41%') : (i ? 'mais de 75%' : '36,7%')}</div><div style={{height: 40, background: '#D2D5DC', position: 'relative'}}><div style={{height: '100%', width: `${amount * p}%`, background: i ? pink : navy, border: i ? `3px solid ${navy}` : 'none', boxSizing: 'border-box'}}/>{!vasco && i === 1 && <span style={{position: 'absolute', left: '75%', top: -22, color: pink, fontSize: 58, fontWeight: 700, opacity: animated ? progress(f, 3 * fps, 3.4 * fps) : 1}}>→</span>}</div></div>;
  })}<div style={{display: 'flex', justifyContent: 'space-between', fontSize: 28, marginTop: 15}}><span>0%</span><span>100%</span></div><div style={{fontSize: 29, marginTop: 24, fontWeight: 600}}>{vasco ? '63% no conjunto das duas copas.' : 'Invicto até a final da Copa do Brasil.'}</div></Card>;
};

const TableRow = ({club, position, points, highlight = false, compact = false}: {club: Club; position: number; points: number; highlight?: boolean; compact?: boolean}) => <div style={{height: compact ? 68 : 88, boxSizing: 'border-box', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: 20, background: highlight ? (club === 'gremio' ? pink : navy) : 'transparent', color: highlight ? paper : navy, borderBottom: '1px solid #BCC3CE'}}><b style={{fontSize: compact ? 32 : 36, width: 68}}>{position}º</b><Crest club={club} size={compact ? 51 : 61}/><b style={{fontSize: compact ? 30 : 32, flex: 1}}>{clubs[club].name}</b><b style={{fontSize: compact ? 35 : 39}}>{points}</b></div>;
const Position = ({vasco = false, animated = false}: Motion & {vasco?: boolean}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = animated ? progress(f, 1 * fps, 3.15 * fps) : 1;
  // Reordering illustrates position; all points belong to the supplied R34 snapshot.
  const gSlot = interpolate(p, [0, 1], [0, 2]);
  const rowHeight = vasco ? 68 : 88;
  return <Card><Tag>BRASILEIRÃO / 34ª RODADA</Tag><div style={{display: 'flex', justifyContent: 'space-between', fontSize: 27, color: '#596476', marginBottom: 12}}><span>CLUBE · Z4: 17º–20º</span><span>PTS</span></div>
    {vasco && <><div style={{position: 'relative', height: 68, marginBottom: 16, zIndex: 3}}><div style={{position: 'absolute', width: '100%', top: interpolate(p, [0, 1], [102, 0])}}><TableRow club="vasco" position={Math.round(16 - 3 * p)} points={41} highlight compact/></div></div><div style={{height: 14, borderTop: '3px dotted #98A3B4', marginBottom: 4}}/></>}
    <div style={{position: 'relative', height: rowHeight * 5}}>
      {standings.map(row => {
        const slot = vasco ? row.position - 16 : row.club === 'gremio' ? gSlot : row.club === 'internacional' ? interpolate(p, [0, 1], [1, 0]) : row.club === 'corinthians' ? interpolate(p, [0, 1], [2, 1]) : row.position - 16;
        const reorderOpacity = animated && !vasco && (row.club === 'internacional' || row.club === 'corinthians') ? interpolate(f, [.6 * fps, 1 * fps, 3.15 * fps, 3.6 * fps], [1, 0, 0, 1], clamp) : animated && vasco && row.club === 'internacional' ? interpolate(f, [0, 2.2 * fps, 3.2 * fps], [0, 0, 1], clamp) : 1;
        return <div key={row.club} style={{position: 'absolute', left: 0, top: slot * rowHeight, width: '100%', opacity: reorderOpacity, zIndex: row.club === 'gremio' ? 2 : 1}}><TableRow club={row.club} position={Math.round(16 + slot)} points={row.points} highlight={row.club === 'gremio'} compact={vasco}/></div>;
      })}
      <div style={{position: 'absolute', top: rowHeight, width: '100%', borderTop: `3px dashed ${pink}`, zIndex: 5}}/>
    </div>
    <div style={{fontSize: vasco ? 34 : 30, fontWeight: 600, marginTop: 20}}>{vasco ? 'Vasco: 4 pontos acima do 17º' : 'Grêmio: da 16ª para a 18ª posição'}</div>
  </Card>;
};

const VascoCups = ({animated = false}: Motion) => <Card><Tag>VASCO / 2026</Tag>{([{competition: 'COPA DO BRASIL', opponent: 'palmeiras'}, {competition: 'SUL-AMERICANA', opponent: 'boca'}] as {competition: string; opponent: Club}[]).map((row, i) => <Reveal key={row.competition} at={i * 1.45 + .3} animated={animated}><div style={{padding: '18px 0 26px', borderBottom: i ? 'none' : '1px solid #ADB4C0'}}><div style={{fontSize: 30, fontWeight: 600}}>{row.competition}</div><div style={{display: 'flex', alignItems: 'center', gap: 19, marginTop: 22}}><Crest club="vasco" size={77}/><div style={{flex: 1, borderBottom: `4px solid ${pink}`}}/><div style={{fontSize: 38, fontWeight: 700}}>SEMIFINAL</div></div><div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 20}}><Crest club={row.opponent} size={75}/><div><div style={{fontSize: 25, color: '#596476'}}>ELIMINADO POR</div><b style={{fontSize: 36}}>{clubs[row.opponent].name}</b></div></div></div></Reveal>)}</Card>;

const Question = ({animated = false, filmMode = false}: Motion) => <>
  <div style={{position: 'absolute', left: 90, top: 325, width: 810}}><Notebook height={365} style={{rotate: '-.5deg'}}>
    <WrittenLine text="COMO EXPLICAR" size={77} start={filmMode ? 1.72 : .15} duration={filmMode ? .95 : .9} animated={animated}/>
    <WrittenLine text="ESSA" size={105} start={filmMode ? 2.67 : 1.05} duration={filmMode ? .35 : .4} animated={animated}/>
    <WrittenLine text="DIFERENÇA?" size={100} start={filmMode ? 3.02 : 1.45} duration={filmMode ? .65 : 1} color={pink} animated={animated}/>
  </Notebook></div>
  <div style={{position: 'absolute', left: 90, top: 730, width: 810}}>{(['gremio', 'vasco'] as Club[]).map((club, i) => <Reveal key={club} animated={animated} at={filmMode ? i * .12 : 2.5 + i * .2}><Card style={{marginBottom: 19, display: 'flex', alignItems: 'center', gap: 25, padding: '16px 28px'}}><Crest club={club} size={85}/><div><div style={{fontSize: 28, fontWeight: 700, color: pink}}>{clubs[club].name.toUpperCase()}</div><b style={{fontSize: 32, lineHeight: 1.2}}>{i ? 'Duas semifinais · 13º na liga' : 'Finalista invicto · 18º na liga'}</b></div></Card></Reveal>)}</div>
  <div style={{position: 'absolute', left: 90, top: 1040, width: 810}}><Notebook height={300} style={{rotate: '.5deg'}}>
    <WrittenLine text="QUAL É A SUA" size={75} start={filmMode ? .12 : 3.15} duration={filmMode ? .65 : .8} animated={animated}/>
    <div style={{marginTop: 15}}><WrittenLine text="OPINIÃO?" size={121} start={filmMode ? .77 : 3.95} duration={filmMode ? .65 : 1.05} color={pink} animated={animated}/></div>
  </Notebook></div>
  <div style={{position: 'absolute', left: 90, top: 1376, width: 810}}><Reveal animated={animated} at={filmMode ? 3.72 : 5.05}><div style={{fontSize: 36, fontWeight: 600, color: paper}}>Conta nos comentários.</div></Reveal></div>
</>;

export const Screen = ({screen: s, animated = false, filmMode = false}: {screen: number; animated?: boolean; filmMode?: boolean}) => <AbsoluteFill style={{background: navy, color: paper, fontFamily: 'Poppins', translate: '-1px 0px'}}>
  {s !== 10 && <>{s === 0 ? <div style={{position: 'absolute', width: 1080, height: 1130, overflow: 'hidden', display: 'flex'}}><Img src={staticFile('episodes/EP01/foto-07.png')} style={{width: 540, height: '100%', objectFit: 'cover', objectPosition: '47% 20%'}}/><Img src={staticFile('episodes/EP01/foto-01.png')} style={{width: 540, height: '100%', objectFit: 'cover', objectPosition: '30% 25%'}}/><div style={{position: 'absolute', left: 538, width: 4, height: 850, background: pink, opacity: .4}}/></div> : <Img src={staticFile(`episodes/EP01/foto-${String(photos[s]).padStart(2, '0')}.${photos[s] === 8 ? 'jpg' : 'png'}`)} style={{position: 'absolute', width: 1080, height: 1100, objectFit: 'cover', objectPosition: s === 5 ? '36% 30%' : '50% 35%'}}/>}<AbsoluteFill style={{background: s === 0 ? 'linear-gradient(180deg,#020C1F12,#020C1F88 21%,#020C1Fdd 39%,#020C1F 71%)' : 'linear-gradient(180deg,#020C1F18 0%,#020C1F88 27%,#020C1Fed 53%,#020C1F 70%)'}}/></>}
  {s !== 10 && <Img src={staticFile('brand/watermark.png')} style={{position: 'absolute', left: 745, top: 85, width: 155, height: 155, objectFit: 'contain', opacity: .25}}/>}
  {s !== 10 && <><div style={{position: 'absolute', left: 90, top: 247, fontSize: 28, fontWeight: 600, color: pink}}>ENTRE A TAÇA E A DEGOLA / EP01</div>
    {s === 0 ? <Cover/> : s === 9 ? <Question animated={animated} filmMode={filmMode}/> : <><div style={{position: 'absolute', left: 90, top: 325, width: 810, fontSize: 96, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2}}>{titles[s].map((t, i) => <div key={t} style={{color: i === titles[s].length - 1 ? pink : paper}}>{t}</div>)}<div style={{marginTop: 26, width: 115, height: 6, background: pink}}/></div><div style={{position: 'absolute', left: 90, top: s === 2 || s === 6 ? 600 : 650, width: 810}}>
      {s === 1 && <CupPath animated={animated} filmMode={filmMode}/>}{s === 2 && <LeagueTimeline animated={animated}/>}{s === 3 && <Bars animated={animated}/>}{s === 4 && <Position animated={animated}/>}{s === 5 && <VascoCups animated={animated}/>}{s === 6 && <LeagueTimeline vasco animated={animated}/>}{s === 7 && <Position vasco animated={animated}/>}{s === 8 && <Bars vasco animated={animated}/>}
    </div></>}
    <div style={{position: 'absolute', left: 90, top: s === 0 ? 1460 : 1450, width: 810, fontSize: 28, lineHeight: 1.4, color: '#BEC8D6'}}>Dados e análise: @sportsmatch.br</div>{!filmMode && <><div style={{position: 'absolute', left: 90, top: 1580, fontSize: 25, color: '#9BA8BB'}}>INSTAPLAYSSS / SPORTSMATCH</div><div style={{position: 'absolute', left: 90, top: 1635, width: 810, height: 4, background: '#304056'}}><div style={{width: `${(s + 1) / 11 * 100}%`, height: 4, background: pink}}/></div></>}
  </>}
  {s === 10 && <SignatureEnding animated={animated}/>}
</AbsoluteFill>;
