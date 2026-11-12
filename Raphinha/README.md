# Raphinha — Sportsmatch / Instaplaysss

Versão atual: **V3 — narração atualizada com Ancelotti**. Direção artística da V2 mantida, com nova sincronização e duração de 2min03s. V1 e V2 permanecem disponíveis.

## Revisar

Abra `entrega/v3/ASSISTIR-V3.html` para assistir à versão atual e navegar pelos capítulos. MP4: `entrega/v3/Sportsmatch-Raphinha-V3.mp4`. Trecho de Ancelotti, capa PNG e narração atualizada original na mesma pasta. Entregas anteriores em `entrega/v1` e `entrega/v2`.

Studio: `http://localhost:3001/Raphinha-V3`. As telas estáticas anteriores continuam disponíveis na pasta de composições `Raphinha-Etapa-2`.

## Projeto

- `src/Design.tsx`: telas e componentes visuais.
- `src/Film.tsx`: montagem e sincronização da V1 em 120s.
- `src/AnimatedTimeline.tsx`: percurso da bola e acumulados das partidas.
- `src/Motion.tsx`: entradas e progresso global com pulsos da trilha.
- `src/SportsBall.tsx`: bolas originais compartilhadas entre timeline e encerramento.
- `src/ArtScenes.tsx` e `src/ArtMotion.tsx`: direção artística V2.
- `src/PaperCrumple.tsx`: páginas dobrando e amassando nas transições.
- `src/FilmV3.tsx` e `src/timing-v3.json`: montagem da nova narração e seus tempos.
- `src/data.ts`: dados, fórmulas e sequência das partidas.
- `src/Root.tsx`: composição V1 e registro das 15 telas.
- `public`: cópias de trabalho das fotos, marcas originais e Poppins.
- `originais`: briefing, planilha recebida, voz e fotos dos treinadores.
- `review`: transcrição automática, capturas e inspeção de layout.
- `docs`: planejamento e registro das decisões.

O ambiente reutiliza Remotion 4.0.542 e as dependências já instaladas no projeto Série B por uma junção `node_modules`. Os arquivos aprovados desse projeto não foram editados. Para transportar o projeto, instalar as dependências de `package.json` no novo ambiente; a junção local não é portátil.

```powershell
npm.cmd run studio
npm.cmd run check
npm.cmd run stills
node scripts/create-gallery.mjs
npm.cmd run prepare:audio
node scripts/render-video.mjs proof
npm.cmd run render:v1
npm.cmd run render:v2
npm.cmd run prepare:audio:v3
npm.cmd run render:v3
```

Detalhes da revisão atual em `docs/V3-NARRACAO-ATUALIZADA.md`; direção artística em `docs/V2-DIRECAO-ARTISTICA.md`. O projeto permanece editável.
