const fs=require('fs');const out='episodes/EP02-Palmeiras-2012/entrega/final';fs.mkdirSync(out,{recursive:true});
const rows=[
 [.34,4.72,'Campeão invicto da Copa do Brasil e rebaixado no Brasileirão.'],
 [5.02,6.72,'Tudo no mesmo ano.'],
 [6.94,10.9,'Em dois mil e doze, o Palmeiras viveu esses dois extremos.'],
 [10.98,15,'Na Copa do Brasil, levantou a taça sem perder nenhuma partida.'],
 [15.56,19.24,'O aproveitamento foi de oitenta e um vírgula oito por cento.'],
 [19.94,23.92,'Em paralelo ao título, o Verdão já amargava a décima oitava posição'],
 [24.36,29.46,'na tabela do Brasileirão, com cinco pontos conquistados em sete jogos.'],
 [29.64,34.66,'Ao final do campeonato, o aproveitamento era de vinte e nove vírgula oito por cento.'],
 [35.26,39.5,'Foram trinta das trinta e oito rodadas dentro da zona de rebaixamento.'],
 [40.1,43.14,'A queda foi confirmada na trigésima sexta rodada,'],
 [43.74,46,'depois do empate em um a um com o Flamengo.'],
 [46.52,49,'A taça veio. A queda também.'],
 [49.52,51.34,'Como você lembra daquele Palmeiras?'],
 [51.72,54.36,'O título amenizou a dor do rebaixamento?'],
 [54.96,57.68,'Campeão invicto e rebaixado?']
];
const captions=rows.map(([a,b,text])=>({text,startMs:Math.round(a*1000),endMs:Math.round(b*1000),timestampMs:null,confidence:null}));
fs.writeFileSync(out+'/EP02-Legendas.json',JSON.stringify(captions,null,2));
const stamp=t=>{const n=Math.round(t*1000);return `${String(Math.floor(n/3600000)).padStart(2,'0')}:${String(Math.floor(n/60000)%60).padStart(2,'0')}:${String(Math.floor(n/1000)%60).padStart(2,'0')},${String(n%1000).padStart(3,'0')}`;};
fs.writeFileSync(out+'/EP02-Legendas.srt',rows.map(([a,b,t],i)=>`${i+1}\n${stamp(a)} --> ${stamp(b)}\n${t}\n`).join('\n'));
