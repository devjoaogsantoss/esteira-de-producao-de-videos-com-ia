export const seasons = [
  {label:'2023/24',barca:{goals:10,assists:13,minutes:1950,games:37},brasil:{goals:1,assists:1,minutes:326,games:4}},
  {label:'2024/25',barca:{goals:34,assists:27,minutes:4661,games:57},brasil:{goals:4,assists:1,minutes:866,games:12}},
  {label:'2025/26',barca:{goals:21,assists:8,minutes:2194,games:33},brasil:{goals:1,assists:1,minutes:378,games:5}},
  {label:'2026/27*',barca:{goals:19,assists:3,minutes:1014,games:14},brasil:{goals:1,assists:2,minutes:679,games:12}},
];
export const per90 = (d:{goals:number;assists:number;minutes:number}) => (d.goals+d.assists)/d.minutes*90;
export const minutesPerGame = (d:{minutes:number;games:number}) => d.minutes/d.games;
export const average = (n:number) => n.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
export const decimal = (n:number) => n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
export const integer = (n:number) => n.toLocaleString('pt-BR');
export const matches = [
  {date:'23/08',name:'Elche',goals:2,assists:1},
  {date:'27/08',name:'Athletic\nBilbao',goals:1,assists:0},
  {date:'31/08',name:'Rayo\nVallecano',goals:2,assists:0},
  {date:'06/09',name:'Valencia',goals:1,assists:0},
  {date:'09/09',name:'Feyenoord',goals:2,assists:0},
  {date:'13/09',name:'Levante',goals:0,assists:2},
  {date:'16/09',name:'Racing\nSantander',goals:3,assists:0},
  {date:'19/09',name:'Sevilla',goals:3,assists:0},
  {date:'25/10',name:'Real\nMadrid',goals:1,assists:0},
  {date:'31/10',name:'Alavés',goals:2,assists:0},
  {date:'03/11',name:'Aston\nVilla',goals:2,assists:0},
];
export const groups = [[0,3],[3,6],[6,8],[8,11]];
export const stills = [
  {id:'Raphinha-Capa',file:'01-Capa',label:'Capa · o paradoxo'},
  {id:'Raphinha-Gancho',file:'02-Gancho',label:'Abertura · muda a camisa'},
  {id:'Raphinha-Temporada',file:'03-Temporada',label:'Temporada · 2026/27 parcial'},
  {id:'Raphinha-Timeline-1',file:'04-Timeline-1',label:'Timeline · Elche a Rayo'},
  {id:'Raphinha-Timeline-2',file:'05-Timeline-2',label:'Timeline · Valencia a Levante'},
  {id:'Raphinha-Timeline-3',file:'06-Timeline-3',label:'Timeline · dois hat-tricks'},
  {id:'Raphinha-Timeline-4',file:'07-Timeline-4',label:'Timeline · total de 19 + 3'},
  {id:'Raphinha-Selecao',file:'08-Selecao',label:'Virada · e na Seleção?'},
  {id:'Raphinha-Grafico',file:'09-Grafico',label:'Comparação · produção por 90'},
  {id:'Raphinha-Amostras',file:'10-Amostras',label:'Comparação · média de minutos por jogo'},
  {id:'Raphinha-Xavi',file:'11-Xavi',label:'Hipótese · mais à direita'},
  {id:'Raphinha-Flick',file:'12-Flick',label:'Hipótese · liberdade ofensiva'},
  {id:'Raphinha-Contexto',file:'13-Contexto',label:'Contexto · Ancelotti e as duplas de ataque'},
  {id:'Raphinha-Fechamento',file:'14-Fechamento',label:'Fechamento · o Brasil aproveita?'},
  {id:'Raphinha-Assinatura',file:'15-Assinatura',label:'Encerramento · Sportsmatch'},
];
