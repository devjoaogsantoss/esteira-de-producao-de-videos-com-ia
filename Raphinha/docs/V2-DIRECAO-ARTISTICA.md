# V2 — direção artística e movimento

Revisão solicitada pelo usuário: capa chamativa com zoom e linguagem cartoon nos primeiros três segundos, papel amassando nas transições, mais vida nas fotografias e ações gráficas que tenham o mesmo papel narrativo da bola na timeline.

## Direção aplicada

### Capa / primeiros 3 segundos

Título “O paradoxo de Raphinha” recebe zoom com overshoot e acomodação de mola. A foto entra em aproximação e deslocamento, com contorno de recorte, sem alterar rosto ou cores do uniforme. Explosão gráfica, retícula, linhas de impacto, sublinhado desenhado e seta reforçam o hook. A pergunta completa ocupa um papel branco recortado, legível desde o começo. Há uma segunda pontuação de zoom antes dos três segundos; depois a composição dá tempo à leitura até a troca de cena aos seis segundos.

A capa mantém a palavra PARADOXO em evidência e o título integral do projeto. A leitura vocal continua sendo a gravação original.

### Fotografias como elementos da cena

Barça e Brasil entram como dois cartões físicos inclinados, com aproximação e movimento de câmera dentro das fotos. As fotos de Xavi, Flick e Ancelotti recebem a mesma linguagem de papel recortado. O jogador recortado da tela de temporada entra em escala, deslocamento e rotação; a bola percorre um arco até o número de gols e uma linha de passe conduz à assistência.

Na virada para a Seleção e no fechamento, foto e texto foram separados para reduzir a sensação de texto sobre uma imagem parada. O fechamento mantém o disclaimer solicitado em três linhas. As fotografias permanecem materiais fornecidos pelo usuário; não foram criadas fotos sintéticas.

### Papel amassando

Cada cena que sai é capturada antes do corte e usada como textura da página. Uma malha de triângulos dobra essa página em profundidade, com projeção, facetas de luz e sombra, encolhimento e saída do quadro. A tela seguinte aparece por trás. É uma simulação gráfica de papel, não um fade com textura sobreposta.

O efeito dura cerca de 0,7s nos cortes principais e é mais curto no encerramento. O conteúdo de cada página deriva do próprio frame da composição. `scripts/render-v2.mjs` atualiza automaticamente essas páginas quando o código de conteúdo muda, evitando transições com uma versão antiga da cena.

### Relações que continuam animadas

Timeline preservada com a bola percorrendo as partidas e os acumulados sincronizados. Campos táticos mantêm os marcadores e as setas ilustrativas; no contexto de Ancelotti, Raphinha e Vini Jr. se separam em dupla, enquanto o esquema do Barça mantém uma referência de ataque sem dupla fixa. Isso ilustra a leitura editorial fornecida, sem simular rastreamento real.

## Organização

Composição `Raphinha-V2`, 1080×1920, 30fps e 120s. V1 preservada em composição e MP4 próprios.

- `src/ArtScenes.tsx`: capa e cenas com a nova direção.
- `src/ArtMotion.tsx`: cartões, recorte do atleta, bola e relações de ataque.
- `src/PaperCrumple.tsx`: amassado das páginas.
- `public/paper`: páginas derivadas da própria composição.
- `entrega/v2`: V2 completa, visualizador, trecho de 16s, capa e comparação.
- `review/v2`: quadros, inspeções e relatórios.

## Áudio e dados

O vídeo completo reutiliza o fluxo AAC da V1 por cópia, sem recodificar a narração ou a trilha. O render da nova imagem é separado do mux final. A conferência de identidade do áudio está no relatório da exportação V2. Permanecem os 120s, os dados, as correções da coleta, as pausas instrumentais e a assinatura “Dados by @sportsmatch.br”.

## Verificações realizadas durante a construção

TypeScript sem erros. Composição V2 carregada no Studio, com Poppins e imagens locais. Quadros da capa entre 0 e 3s, estados do amassado, fotos, dados e fechamento exportados e inspecionados a 360px. Os enquadramentos e a legibilidade dos créditos foram ajustados nessa inspeção.

Trecho representativo de 16s, com 480 frames: H.264/AAC, 1080×1920, 30fps, decodificação sem erros e reprodução técnica até o fim sem quadros descartados. Foram conferidos quadros do próprio MP4, incluindo a transição que amassa a capa e a bola chegando aos números.

As verificações do MP4 completo ficam em `review/v2/qa-Sportsmatch-Raphinha-V2.json` e `review/v2/playback-Sportsmatch-Raphinha-V2.json`. Não se afirma escuta subjetiva pelo agente; a revisão de áudio desta versão é a identidade do fluxo aprovado anteriormente.

MP4 completo conferido: H.264/AAC, 1080×1920, 30fps, 3.600 frames, 120s e 28.803.127 bytes. Decodificação integral sem erros. AAC em -16,14 LUFS, pico verdadeiro de -1,89 dBTP e SHA-256 idêntico ao áudio da V1. Quadros extraídos do arquivo completo foram inspecionados, incluindo capa, dobras, ações de bola e passe, fotos dos treinadores, conclusão e encerramento. Visualizador com nove capítulos testado e funcionando.

Reprodução técnica integral concluída: 120s até o fim, 3.600 frames e zero quadros descartados, com áudio habilitado. A V2 está disponível para revisão.

## Reproduzir / exportar

```powershell
npm.cmd run studio
npm.cmd run check
node scripts/render-v2.mjs snapshots
node scripts/render-v2.mjs proof
npm.cmd run render:v2
node scripts/qa-video.mjs entrega/v2/Sportsmatch-Raphinha-V2.mp4 review/v2
node scripts/playback-review.mjs entrega/v2/Sportsmatch-Raphinha-V2.mp4 review/v2
```
