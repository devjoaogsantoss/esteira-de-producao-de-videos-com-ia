export const clubs = {
  gremio: {name: 'Grêmio', file: 'gremio'}, vasco: {name: 'Vasco', file: 'vasco'},
  palmeiras: {name: 'Palmeiras', file: 'palmeiras'}, internacional: {name: 'Internacional', file: 'internacional'},
  corinthians: {name: 'Corinthians', file: 'corinthians'}, remo: {name: 'Remo', file: 'remo'},
  chapecoense: {name: 'Chapecoense', file: 'chapecoense'}, mirassol: {name: 'Mirassol', file: 'mirassol'},
  atletico: {name: 'Atlético-MG', file: 'atletico'}, boca: {name: 'Boca Juniors', file: 'boca'},
} as const;
export type Club = keyof typeof clubs;
export const standings: {club: Club; position: number; points: number}[] = [
  {club: 'internacional', position: 16, points: 38}, {club: 'corinthians', position: 17, points: 37},
  {club: 'gremio', position: 18, points: 37}, {club: 'remo', position: 19, points: 29},
  {club: 'chapecoense', position: 20, points: 21},
];
export const gremioZ4: Record<number, number> = {15: 17, 21: 17, 28: 17, 29: 18, 30: 18, 31: 18, 32: 17, 34: 18};
export const vascoZ4: Record<number, number> = {3: 17, 4: 20, 18: 17, 19: 17, 20: 18, 21: 18, 22: 18, 23: 19, 24: 19, 25: 17, 26: 17, 27: 17};
export const final = {opponent: 'palmeiras' as Club, date: '06/12', venue: 'Mané Garrincha', city: 'Brasília'};
