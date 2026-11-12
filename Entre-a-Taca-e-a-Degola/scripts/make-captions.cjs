const fs = require('fs');
const out = 'episodes/EP01-Gremio-Vasco-2026/entrega/final';
fs.mkdirSync(out, {recursive: true});
// Phrase timings follow the measured narration; spelling follows the approved
// script rather than raw Whisper errors. No captions are burned onto graphics.
const rows = [
  [0.34, 2.68, 'Invicto até a final da Copa do Brasil'],
  [2.68, 4.76, 'e décimo oitavo no Brasileirão.'],
  [5.16, 7.34, 'Na Copa do Brasil de dois mil e vinte e seis,'],
  [7.46, 10.06, 'o Grêmio eliminou Mirassol nas oitavas,'],
  [10.32, 11.38, 'Inter nas quartas'],
  [11.38, 13.38, 'e Atlético Mineiro na semifinal.'],
  [14, 15.68, 'Mas esteve no Z4'],
  [15.68, 18.24, 'em oito das trinta e quatro rodadas do Brasileiro.'],
  [18.68, 21.76, 'O aproveitamento é de trinta e seis vírgula sete por cento,'],
  [22.46, 25, 'contra mais de setenta e cinco na Copa do Brasil.'],
  [25.78, 27.18, 'O Grêmio chega à final'],
  [27.18, 30.22, 'com uma mão perto da taça e a corda no pescoço.'],
  [31.12, 33.02, 'Já o Vasco chegou às semifinais'],
  [33.02, 35.54, 'da Copa do Brasil e da Sul-Americana,'],
  [35.62, 37.78, 'mas passou doze das trinta e quatro rodadas'],
  [37.78, 39.66, 'na zona de rebaixamento.'],
  [40.26, 43.3, 'Atualmente, é o décimo terceiro colocado,'],
  [43.62, 45.88, 'quatro pontos acima do décimo sétimo.'],
  [46.26, 48.12, 'No Brasileiro, o aproveitamento é'],
  [48.12, 49.5, 'de quarenta e um por cento.'],
  [49.94, 52.7, 'Nas duas copas juntas, sessenta e três.'],
  [53.32, 54.7, 'Qual é a sua opinião?'],
  [54.98, 56.84, 'Como você explicaria essa diferença?'],
];
const captions = rows.map(([start, end, text]) => ({text, startMs: Math.round(start * 1000), endMs: Math.round(end * 1000), timestampMs: null, confidence: null}));
fs.writeFileSync(out + '/EP01-Legendas.json', JSON.stringify(captions, null, 2));
const stamp = seconds => {const ms = Math.round(seconds * 1000);return `${String(Math.floor(ms / 3600000)).padStart(2,'0')}:${String(Math.floor(ms / 60000) % 60).padStart(2,'0')}:${String(Math.floor(ms / 1000) % 60).padStart(2,'0')},${String(ms % 1000).padStart(3,'0')}`;};
fs.writeFileSync(out + '/EP01-Legendas.srt', rows.map(([a, b, text], i) => `${i + 1}\n${stamp(a)} --> ${stamp(b)}\n${text}\n`).join('\n'));
console.log('Legendas opcionais separadas exportadas.');
