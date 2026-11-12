# Verificações executadas — V2

- TypeScript: `tsc --noEmit` passou após a implementação.
- Onze PNGs exportados pelo Remotion em 1080×1920, com versões 360×640 e painel geral; quadros reduzidos inspecionados.
- Dez escudos: PNGs de 500×500 com canal alfa, preservados em originais e copiados para public.
- Galeria HTML aberta como arquivo local no navegador do Remotion. Player, seletor de 11 telas e imagens carregaram. Os três pesos de Poppins foram confirmados carregados via FontFaceSet.
- Reprodução das telas 2–9 acionada no navegador, com capturas intermediárias e finais. O ajuste de fade das linhas que cedem lugar aos clubes evita textos cruzados durante a movimentação.
- Studio aberto em localhost:3021/EP01-Estudo-Movimento. Prévia carregada e captura registrada.
- Os dados novos foram transcritos da mensagem do usuário, sem nova apuração factual. O código preserva 8/34 e 12/34 e as posições informadas. Trechos fora do Z4 não são apresentados como posições exatas confirmadas.
- Não foi produzida montagem completa com locução nem exportado MP4 final. Os tempos de 6s da galeria são estudos de movimento, ainda sem alinhamento por palavra.

Evidências locais na pasta `entrega/telas-v2`: painel, PNGs individuais, capturas do navegador e `browser-check.json`.

O Webpack avisou sobre cache de dependências; os PNGs foram exportados. Uma requisição auxiliar do Studio para bugs.remotion.dev não teve acesso à rede durante a primeira inspeção; a prévia local carregou.
