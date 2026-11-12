# Sportsmatch / Instaplaysss — Série B 2026

## Comparação gráfica V2

Nova composição separada: `SerieB2026-Grafica-V2`, 49,8s. Títulos maiores, vagas e conexões visuais para explicar as ações de acesso. O áudio aprovado é copiado do MP4 anterior sem recodificação. A versão anterior permanece disponível.

Vídeo e comparações em `entrega/revisao-grafica`. Estudos de título A/B, quadros de acesso/playoff, antes/depois a 360px e trecho de transição acompanham a entrega. Detalhes, decisão de título e sincronização: `docs/REVISAO-GRAFICA-V2.md`.

```powershell
node scripts/render-graphic.mjs proof
node scripts/render-graphic.mjs full
node scripts/qa-graphic.mjs full
```

Studio: `http://localhost:3000/SerieB2026-Grafica-V2`.

Projeto Remotion editável criado a partir da revisão `public/originais/tela_01.png` a `tela_07.png` e `LEIA_PRIMEIRO.txt`. Os originais foram preservados. Não havia projeto React prévio no pacote.

## Estado da entrega

Composição final integrada à locução ElevenLabs fornecida pelo usuário. **1494 frames, 49,8s, 1080 × 1920, 30 fps**, incluindo capa de 1s e encerramento de 2s. O áudio recebido tem 50,364s; foi retirado um trecho de 2,5s que atribuía os ganhos editoriais a argumentos oficiais, mais 0,096s de cauda silenciosa. A voz ficou com 47,768s, sem alteração de velocidade ou tom e preservando as demais pausas. O original está preservado.

Arquivos em `entrega`: `Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4`, `Capa-SerieB2026.png`, `Narracao-SerieB2026.wav`, `VERIFICACAO.json`. A prévia antiga permanece separada. O áudio antigo `narracao.wav` não é usado. Detalhes do corte editorial e da variante de texto recebida em `docs/PRODUCAO-FINAL-2026.md`.

## Abrir e editar

Na pasta deste arquivo, no PowerShell:

```powershell
npm.cmd install
npm.cmd run studio
```

Studio: `http://localhost:3000/SerieB2026-Revisao` (ou a porta que o terminal indicar).

- `src/Sportsmatch.tsx`: componentes separados e texto editável das sete etapas, encerramento, fotografia, mix e timeline.
- `src/timing.json`: duração e inícios das cenas em frames, 30 fps.
- `src/reveals.json`: entradas dos dados dentro de cada cena, ajustadas à gravação fornecida.
- `src/music-pulse.json`: envelope real de energia/ataques, a partir do segundo 10 da música. Indexado pelo frame global, independente dos cortes.
- `public/assets/final-2026`: cópias de trabalho e marcas extraídas das telas corrigidas.
- `scripts/prepare-assets.mjs`: extração reprodutível dos ativos e análise da percussão.
- `docs/narracao-final-2026.txt`: texto integral autorizado.

## Reproduzir a integração da voz fornecida

```powershell
node scripts/trim-provided-pauses.mjs
node scripts/integrate-voice.mjs public/audio/narracao-final-2026-ajustada.wav docs/cues-final-2026.json
node scripts/review.mjs
npm.cmd run render:final
node scripts/qa-export.mjs entrega/Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4
```

O MP3 fornecido foi copiado para `public/audio/narracao-final-2026-fornecida.mp3`. Os pontos de corte são medidos em pausas reais e registrados em `review/voice-pause-edits.json`. O nome do script de corte foi preservado da análise inicial; ele remove o trecho editorial e a cauda, sem comprimir as outras pausas.

## Substituir a voz em uma revisão futura

Opção A: configurar `ELEVENLABS_API_KEY` e `ELEVENLABS_VOICE_ID` como variáveis privadas do ambiente; executar `node scripts/generate-voice.mjs`. O script usa a voz escolhida na conta, retorna alinhamento por caractere e deriva os cortes. Não imprime nem armazena a chave. A interpretação e as pronúncias precisam ser ouvidas após a geração. Não faz clonagem vocal.

Opção B: fornecer um novo WAV/MP3 com o texto autorizado e um JSON com sete inícios em segundos:

```json
{"starts":[0,1,10,19.5,23,26.5,32.5]}
```

Os tempos do exemplo são provisórios: capa, formato, funcionamento, Novorizontino, segunda posição, confrontos, contexto. Ajustar ao áudio real; a locução deve terminar até 48 segundos, com 2 segundos reservados ao encerramento. Não substituir o WAV antigo no lugar do novo texto.

```powershell
node scripts/integrate-voice.mjs CAMINHO-DA-NOVA-VOZ.wav docs/cues-final-2026.json
node scripts/review.mjs
npm.cmd run render:final
```

A integração normaliza a voz, reduz a música por sidechain durante fala, recupera-a nas pausas e aplica fade/limitação. Não acelera a voz. Gera `entrega/Narracao-SerieB2026.wav` e atualiza os tempos. Render final: `entrega/Sportsmatch-Instaplaysss-SerieB2026-FINAL.mp4`, H.264/AAC, 1080 × 1920, 30 fps. Rever cortes, pronúncias e mix após integração, antes de publicação.

## Revisão e exportação

```powershell
npm.cmd run check
node scripts/review.mjs
npm.cmd run render:preview
npm.cmd run cover
```

No Windows, os comandos usam `npm.cmd` e `npx.cmd`, evitando o bloqueio de execução de scripts do PowerShell. Remotion 4.0.542 e navegador fornecido pelo próprio Remotion.

O roteiro anterior de cinco telas e a exigência antiga de 1290 frames foram superados pelo pedido atual. O final tem 1494 frames (49,8s), dimensionados pela voz fornecida e respeitando o teto de 1500 frames.

Evidências, créditos e limitações: `docs/PRODUCAO-FINAL-2026.md`.
