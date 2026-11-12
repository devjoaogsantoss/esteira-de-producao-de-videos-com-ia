# Revisão visual V2 — EP01

Pedido direto: revisar telas e movimentos; manter aprovação visual antes da produção do vídeo completo.

- Capa: fotografia dos dois clubes, escudos junto aos nomes, pergunta em duas linhas, campanhas dos dois clubes e classificação com Vasco em 13º/41 e Grêmio em 18º/37.
- Tela 2: avanço desenhado, marcador do Grêmio e escudos dos quatro adversários. Final contra Palmeiras, 06/12, Mané Garrincha, Brasília. Decisão em aberto.
- Telas 3 e 7: cronologia do Z4 informada pelo usuário; 8 e 12 rodadas, respectivamente. Sem o texto antigo sobre ausência de cronologia. Trechos fora do Z4 são estimados conforme autorização, tracejados e sem escala de posições exatas; a galeria explica a distinção.
- Telas 4 e 9: barras animadas, mesma escala de 0–100%. Preservados “mais de 75%” e 63% conjunto das duas copas.
- Telas 5 e 8: escudos e pontos do recorte fornecido. Internacional em 16º está acima da zona. Grêmio cruza a fronteira do Z4 na queda 16º→18º. Vasco sobe da faixa do 16º ao destino 13º/41 pontos. Esses movimentos são demonstrações de posição; não uma história de pontuação. Textos sobre linhas neutras removidos.
- Tela 6: entradas progressivas e identificação de Palmeiras e Boca Juniors como eliminadores nas semifinais.
- Tela 10: escudos junto aos dois resumos.

Código vigente: `shared/RevisedScreen.tsx`, `shared/episode-data.ts`. Ajuste prévio de translação de -1px preservado. A V1 e seu código foram mantidos para comparação. Dados completos em `episodes/EP01-Gremio-Vasco-2026/dados.json`.

Prévia: composição `EP01-Estudo-Movimento`, 6s, prop `screen` de 0 a 10. A galeria usa o mesmo componente via Remotion Player, com seletor e reprodução. Sem voz; montagem e alinhamento com locução continuam posteriores à aprovação. Não foi exportado MP4 completo.

Galeria atual: `episodes/EP01-Gremio-Vasco-2026/entrega/telas-v2/index.html`. O endereço antigo da galeria V1 encaminha para a V2; `galeria-v1.html` preserva a navegação histórica.

Origem dos novos dados: mensagem do usuário; sem auditoria externa da pauta. Escudos originais baixados da ESPN CDN, com cópias originais no episódio e cópias de trabalho em public. Data de corte editorial e créditos de origem das fotos continuam pendentes para publicação.
