# Entre a Taça e a Degola

Revisão visual vigente: **V3**, aprovada para produção. Montagem completa: `Entre-a-Taca-e-a-Degola-EP01`, 59,7s, 1080×1920, 30fps, com a locução fornecida e trilha aprovada.

Entrega principal em `episodes/EP01-Gremio-Vasco-2026/entrega/final/`. Abra `Assistir-EP01.html` para reproduzir o vídeo e acessar os arquivos. A voz original, a capa, as legendas opcionais e a legenda sugerida para publicação ficam na mesma pasta.

Abra `episodes/EP01-Gremio-Vasco-2026/entrega/telas-v3/index.html` no navegador. Selecione a tela no Player e pressione reproduzir. Os PNGs estão na mesma página. O endereço antigo encaminha à V3; `telas-v1/galeria-v1.html` preserva a galeria histórica.

- `npm run studio`: Studio. Composições EP01-Telas-Aprovacao e EP01-Estudo-Movimento, prop screen de 0 a 10.
- `npm run check`: TypeScript.
- `npm run telas`: PNGs da V3.
- `npm run galeria`: compila a galeria com Player e assets incorporados.
- `npm run prepare:film`: normaliza a cópia da voz, mixa a trilha e recalcula os pulsos.
- `npm run render:trecho`: exporta o trecho de revisão de 8s a 25,5s.
- `npm run render:final`: exporta o MP4 completo com voz.
- `node scripts/make-captions.cjs`: gera legendas opcionais separadas.

EP01: produção autorizada após V3. A galeria permanece como estudo visual, com cenas de 6s sem voz. A composição do filme usa tempos próprios alinhados à locução. EP02–04: dados e planejamento inicial; sem vídeos.

Cada episódio tem briefing, dados, roteiro, storyboard, manifesto, revisões, assets/originais e entrega. Cópias servidas em public/episodes/EPxx. Marca, Poppins e trilha aprovadas compartilhadas em public.

Código vigente: shared/EP01Film.tsx, shared/film-timing.json, shared/RevisedScreen.tsx, shared/episode-data.ts e src/Root.tsx. Código anterior preservado. Montagem em docs/MONTAGEM-EP01.md; revisão visual em docs/REVISAO-TELAS-V3.md. Verificações de exportação em docs/VERIFICACAO-FINAL-EP01.md.

Remotion 4.0.542, React 19.2.3. Dependências existentes reutilizadas por junction local para ../PLAYOFF ACESSO SERIE B-A/node_modules, sem instalação. Para transportar: remover somente a junction e executar npm ci.

O ZIP do projeto não inclui node_modules, builds, revisões históricas nem MP4s. Ao extrair em uma nova pasta, execute `npm ci`, `npm run check`, `npm run studio`. Os ativos de trabalho, a locução original, a mixagem e os tempos estão incluídos. Para regenerar tudo, use prepare:film, telas e render:final nessa ordem. A geração das telas também fornece a capa usada na entrega.


