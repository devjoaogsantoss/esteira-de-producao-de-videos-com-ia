# Entre a Taça e a Degola
## Pacote de produção — Sportsmatch / Instaplaysss
Versão 2.0 · 12/11/2026 — montagem pela narração recebida

Série de quatro vídeos verticais independentes. O EP01 tem nova exceção de duração: voz recebida com 57,0775s; montagem orientada por esse áudio. Primeiro episódio: Grêmio em destaque e Vasco em paralelo. Este arquivo contém o prompt atualizado de produção para o Codex, com direção visual integrada. Substitui as instruções anteriores de duração e o roteiro preliminar do EP01. Não contém vídeo finalizado. Dados recebidos da Sportsmatch; esta entrega não realiza nova apuração.

# 1. PROMPT PARA COLAR NO CODEX

Você vai organizar e produzir a série **Entre a Taça e a Degola**, do canal Instaplaysss, com dados e análise Sportsmatch.


## Nomes dos episódios
O título fixo da série é **Entre a Taça e a Degola**. Os subtítulos abaixo são também os nomes editoriais dos episódios:

| Episódio | Subtítulo / nome | Protagonistas |
|---|---|---|
| EP01 | Grêmio e Vasco: leões de mata-mata? | Grêmio e Vasco, 2026 |
| EP02 | Palmeiras: a taça veio, a queda também | Palmeiras, 2012 |
| EP03 | Fluminense e Corinthians: do sufoco à arrancada | Fluminense, 2009; Corinthians, 2024 |
| EP04 | United e Tottenham: final na Europa, sufoco na Inglaterra | Manchester United e Tottenham, 2024/25 |

No EP04, “sufoco” descreve a campanha ruim na liga; não afirmar luta contra a queda até a final europeia. Título da série e subtítulo entram na capa e na identificação; a narração abre diretamente pelo gancho para preservar o tempo. A identificação da série pode ser discreta. No EP01, preservar exatamente “Grêmio e Vasco: leões de mata-mata?” como subtítulo. Não é necessário recitar o título inteiro na voz.

## Objetivo editorial e autonomia
Conte curiosidades sobre clubes que avançaram em copas enquanto viveram dificuldades na liga. A intenção é relembrar histórias e provocar conversa, sem investigar ou demonstrar as causas do fenômeno. Evite afirmar que as copas causaram a campanha ruim na liga. Cada episódio precisa funcionar sozinho, com gancho e desfecho próprios; não depende de assistir aos anteriores.

Crie a estrutura dos quatro episódios e implemente primeiro o EP01. Prepare os demais com briefing, dados, roteiro inicial e lista de ativos; não renderize os quatro antes de consolidar o piloto. Não peça aprovação a cada decisão reversível. Avance no EP01 até a entrega final quando os materiais essenciais estiverem disponíveis. Se faltarem voz, logos ou fotos essenciais, conclua os componentes, storyboard e prévia visual possível, registrando a ausência sem inventar ativos nem alegar uma entrega final concluída.

## Referências e identidade
Leia AGENTS.md e o relatório consolidado disponíveis neste projeto. O relatório incorpora os manuais, a referência técnica e o briefing. Consulte também video-layout.md e os fluxos Remotion pertinentes. Se houver o projeto Série B V2 no ambiente, consulte seus componentes aprovados. Não presuma que caminhos mencionados nos documentos existem no novo workspace.

A referência de Luciano Juba orienta a apresentação progressiva dos gráficos, cartões de papel e continuidade visual. Raphinha V3 serve como comparação histórica. Não copie a paleta, logotipo ou assinatura de outra marca. Se os vídeos não estiverem disponíveis, execute a direção descrita neste prompt e registre a limitação de referência.

Formato: 1080×1920, 30fps, MP4 H.264/AAC. O EP01 segue o áudio recebido de 57,0775s; duração inicial prevista de aproximadamente 59–60s, incluindo cerca de 2s de encerramento após a fala. Não forçar o EP01 a 40s. Para os demais episódios, manter 20–40s como intenção inicial sujeita ao texto e à voz aprovados. A voz real determina os tempos finais. Sem vinheta longa; o gancho aparece no primeiro quadro.

Paleta: azul #020C1F, rosa #FF0244, leitura #EEEEF0. Poppins Bold 700 nos títulos; Poppins 400/600/700 no conteúdo. Introduza cartões de papel em #EEEEF0, com texto azul e rosa, preservando a identidade. Textura sutil, sombras curtas, bordas e pequenas inclinações controladas. O papel é superfície dos dados, não apenas efeito de transição.

Conteúdo crítico dentro de x=90–900 e y=240–1500. Títulos com 90–115px como ponto de partida; explicações 40–46px e créditos de pelo menos 28px. Valide a leitura em 360×640; simplifique a composição em vez de comprimir os caracteres. Use apenas logos originais. Selo circular como marca-d'água e assinatura original no encerramento, conforme os ativos disponíveis. Canal: Instaplaysss. Crédito editorial: Dados e análise: @sportsmatch.br.

## Estrutura de pastas
Crie a pasta `Entre-a-Taca-e-a-Degola/`, contendo:
- README.md: mapa da série, status por episódio, comandos, dependências e entregáveis.
- docs/: direção visual, regras dos gráficos e decisões.
- shared/: configuração, componentes reutilizáveis e estilos.
- public/brand/, public/fonts/, public/audio/ e public/textures/.
- episodes/EP01-Gremio-Vasco-2026/.
- episodes/EP02-Palmeiras-2012/.
- episodes/EP03-Fluminense-2009-Corinthians-2024/.
- episodes/EP04-United-Tottenham-2024-25/.

Dentro de cada episódio: briefing.md, dados.json, roteiro.md, storyboard.md, assets-manifest.csv, revisoes.md e entrega/. Coloque os ativos servidos pelo Remotion em public/episodes/EPxx/, mantendo arquivos originais e cópias de trabalho separados. Use uma composição própria por episódio e componentes compartilhados. Adapte a organização ao repositório existente sem mover ou sobrescrever produções aprovadas. Não instale dependências sem inspecionar package.json e lockfile.

## Regra obrigatória: o dado precisa virar imagem e movimento
Não use texto solto como única representação de fases, posições, permanência no Z4 ou aproveitamento. Cada informação citada na voz precisa ser ilustrada e animada perto da palavra correspondente. Dados adicionais na tela também precisam de tempo legível. Uma ação principal por vez; entrada, revelação e pausa. Evite números girando sem função, câmera excessiva, papel amassado em todos os cortes e elementos decorativos competindo com a análise.

### A. Caminho de mata-mata: bracket de progressão
Crie um bracket compacto: oitavas → quartas → semifinal → final. Cada fase é um nó conectado com o adversário real informado, nome/escudo e indicação de avanço. A conexão é desenhada e o marcador do clube percorre o caminho. A final ainda não disputada recebe “A DISPUTAR”, sem animação de título ou vitória. “Invicto até a final” aparece como selo ligado ao percurso.

Quando só houver informação da semifinal ou final, mostre a fase conhecida e destaque “chegou à semifinal/final”. Não invente adversários, placares ou confrontos anteriores para preencher o bracket. Se houver duas competições, use duas trilhas identificadas. Não construa uma chave completa com confrontos desconhecidos.

### B. Rodadas no Z4: faixa segmentada dentro de uma ficha de caderno
Use o motivo gráfico de bracket/moldura, mas represente a quantidade por uma faixa ou grade de 34 células. Para Grêmio, revele 34 unidades e destaque oito; Vasco, doze. Exiba “8 de 34 rodadas no Z4” / “12 de 34 rodadas no Z4”.

Como só temos totais, os destaques são uma contagem ilustrativa, sem indicar quais rodadas foram. Inclua “contagem ilustrativa” e não simule a cronologia real. Uma timeline cronológica só pode ser construída se forem fornecidas as rodadas exatas. Não use chave de eliminação para representar tempo: preserve a estética de bracket com uma codificação adequada ao dado.

### C. Posição no campeonato: recorte da tabela
Anime uma ficha com a posição e o escudo. Mostre a fronteira entre 16º/17º e a faixa Z4, destacando o 18º do Grêmio. Para o Vasco, destaque o 13º e a distância informada para o 17º. Não preencha linhas com equipes ou pontos desconhecidos; use linhas neutras, marcadas como recorte ilustrativo. A posição vem com “após 34 rodadas da competição”, data de corte a confirmar e quantidade individual de jogos quando fornecida. Não confunda 34 rodadas do campeonato com 34 partidas de cada clube.

### D. Aproveitamento: barras comparáveis
Use barras horizontais alinhadas, com escala comum de 0–100%, base zero, rótulo da competição e número visível. Diferencie por preenchimento, contorno e rótulo, sem depender apenas da cor.
- Grêmio: Brasileirão 36,7%; Copa do Brasil “mais de 75%”. Não converta a desigualdade em 75,0% ou em um valor exato inventado. Mostre marca de 75% e indicação gráfica de que passa dela. Acrescente selo “invicto até a final”.
- Vasco: Brasileirão 41%; Copa do Brasil + Sul-Americana 63%. Identifique que o segundo valor reúne as duas competições, sem atribuir 63% a cada uma separadamente.
- Palmeiras: 29,8% no Brasileiro × 81,8% na Copa do Brasil, conforme dados fornecidos.
- Fluminense: 40% na liga inteira; 75% na reta final só entra quando a janela exata vier definida. Não crie essa janela por conta própria.
- Corinthians: 63% no conjunto das duas copas; não invente percentual do Brasileiro.
- Tottenham: 33% no campeonato, conforme dado fornecido. Não inferir percentual europeu ou do United.

Não calcule nem represente uma segunda barra para valores ausentes. Represente a informação disponível e reserve o contraste restante para uma ficha de fase/posição. Contagem animada é revelação do valor final, não série histórica.

## Dados e responsabilidade
Os números abaixo foram fornecidos e validados pelo usuário/Sportsmatch. Use-os como base editorial, sem abrir uma nova auditoria ou condicionar a produção à pesquisa externa. Preserve campos de origem fornecidos, sem inventar fontes, fórmulas ou precisão extra. Peça apenas informação ausente indispensável para uma representação específica. Quando um detalhe opcional estiver indefinido, omita-o do piloto e prossiga. Não altere valores silenciosamente.

### EP01 — Grêmio e Vasco, 2026
Grêmio: finalista da Copa do Brasil, invicto até a decisão; eliminou Mirassol nas oitavas, Internacional nas quartas e Atlético-MG na semifinal. O dado fornecido é oito rodadas no Z4 entre 34 rodadas disputadas da competição; posição atual 18º. Aproveitamento informado: 36,7% no Brasileiro e mais de 75% na Copa do Brasil. Eliminado nas oitavas da Sul-Americana: informação secundária, dispensável no piloto.
Vasco: semifinalista da Copa do Brasil e da Sul-Americana; doze rodadas no Z4 entre 34 rodadas da competição; posição atual 13º, quatro pontos acima do 17º; aproveitamento 41% no Brasileiro e 63% no conjunto das duas copas. O risco histórico de 50% fica fora do piloto, pois exigiria uma data adicional e acrescentaria uma métrica desnecessária.
Origem indicada pelo usuário para contagem do Z4: https://www.365scores.com/pt-br/news/magazine/grafico-rebaixamento-brasileirao-z4/ . Demais valores: levantamento fornecido pela Sportsmatch. Registrar a data de corte editorial antes da publicação, sem assumir que a peça continuará atual depois de novas partidas.

### EP02 — Palmeiras, 2012
Campeão invicto da Copa do Brasil e rebaixado no Brasileiro. Trinta de 38 rodadas no Z4. Queda confirmada na 36ª rodada após 1×1 com Flamengo. Aproveitamento informado: 81,8% na copa e 29,8% na liga. Dados fornecidos pela Sportsmatch. Não inventar a chave anterior à final caso os adversários não estejam disponíveis.

### EP03 — Fluminense, 2009, e Corinthians, 2024
Fluminense: vice da Sul-Americana diante da LDU, permanência após empate com Coritiba na última rodada, 46 pontos; aproveitamento informado na liga inteira 40%. Reta final de reação: a descrição fornecida menciona onze rodadas e 75%, mas a correspondência exata entre janela e percentual não foi definida; não relacionar esses dois números por inferência. É possível contar o caso sem esse percentual.
Corinthians: semifinalista da Copa do Brasil e da Sul-Americana, aproveitamento conjunto informado de 63%; vinte rodadas no Z4 e nove vitórias nos nove jogos finais. Não afirmar que todas essas vitórias foram necessárias para garantir matematicamente a permanência. Não inventar posição final nem aproveitamento na liga.

### EP04 — Manchester United e Tottenham, 2024/25
Disputaram a final da Europa League; Tottenham campeão. Posições finais na Premier League: United 15º, Tottenham 17º. Aproveitamento informado do Tottenham: 33%. O bloco amplia a curiosidade para campanha ruim na liga × sucesso europeu. Não dizer que lutavam contra a queda até a final: os três rebaixados já estavam definidos em 26/04/2025, antes da decisão de 21/05/2025. Não usar a expressão brasileira Z4: na Premier League a zona tem três clubes.
Referências já consultadas nesta conversa: https://www.uefa.com/uefaeuropaleague/news/0299-1dcffd82d4a0-c280ee5f9c62-1000/ e https://www.premierleague.com/en/news/4294767/ipswich-relegated-as-bottom-three-confirmed .
Athletico fica fora desta série.

## Montagem do EP01
Prioridade visual e de tempo: Grêmio, aproximadamente 60–65%; Vasco, 35–40%. Não exibir os dois clubes em telas pequenas durante todo o vídeo. Comece com Grêmio em tela cheia e use o paralelo apenas no momento certo.

Não usar os tempos do roteiro preliminar de 40s. Construir uma cue sheet pela gravação efetiva. Os blocos abaixo são marcos semânticos, não timestamps medidos:

| Fala de referência | Ação visual |
|---|---|
| “Invicto até a final ... décimo oitavo” | Gancho desde o primeiro quadro. Capa de aproximadamente 2s com “Grêmio e Vasco: leões de mata-mata?” e título da série menor. Não esperar a capa terminar para iniciar a fala. Primeiro bracket/ficha e recorte do 18º complementam a abertura sem competir com o título. |
| “Mirassol nas oitavas, Inter nas quartas e Atlético Mineiro na semifinal” | Bracket do Grêmio desenhado progressivamente por fase; avance o marcador na palavra correta. Final com “a disputar”. |
| “oito das trinta e quatro” | Faixa de 34 unidades com oito destaques; rótulo de contagem ilustrativa, sem cronologia inventada. |
| “trinta e seis vírgula sete ... mais de setenta e cinco” | Barras 36,7% × mais de 75%, escala comum; revelar cada uma junto à fala. |
| “uma mão perto da taça e a corda no pescoço” | Síntese com copa de um lado e marcador na faixa Z4 do outro. Não mostrar corda literal no pescoço de pessoa. |
| “Vasco ... semifinais da Copa do Brasil e da Sul-Americana” | Duas trilhas de bracket, cada uma identificada, chegando à semifinal; sem inventar adversários. |
| “doze das trinta e quatro” | Faixa com 12/34 destacadas e mesmo padrão da faixa do Grêmio. |
| “décimo terceiro ... quatro pontos acima do décimo sétimo” | Recorte da classificação, destaque 13º e conexão com distância de quatro pontos para o 17º. Não posicionar Vasco no Z4 atual. |
| “quarenta e um ... sessenta e três” | Barras 41% Brasileiro × 63% no conjunto das duas copas. |
| Pergunta final | Dois cartões juntos e pergunta para comentários; depois, assinatura por cerca de 2s. |

As duas comparações de aproveitamento são obrigatórias neste piloto. Podem ser parcialmente conduzidas pela tela para preservar naturalidade da fala. Todos os dados citados na narração devem ter correspondência visual. Narração não precisa recitar todo texto exibido. Créditos extensos e detalhes secundários podem ir à legenda.

## Voz, som e execução
Português brasileiro, próximo do fã, curioso e com contraste de intenção; sem tom de locutor publicitário ou leitura robótica. A voz já foi fornecida; reutilizar esse arquivo, sem gerar outra voz. Não simular clonagem nem substituir silenciosamente a voz aprovada. Trilha abaixo da voz, entradas e saídas suaves. Usar a trilha aprovada apenas se o arquivo estiver disponível. Reaproveitar o encerramento original quando disponível.

Implementar gráficos e texto em componentes controlados, não em imagens geradas. Anime por frame de forma determinística; sincronize palavras e ações com a gravação real. Fonte de dados, assets e tempos em configurações separadas. Componentes sugeridos: PaperCard, CupProgressBracket, Z4SegmentStrip, LeaguePositionCard, UtilizationComparison e EpisodeSignature.

## Revisão e entrega
Revise quadros-chave a 360×640; teste um trecho com bracket, barras e transição de ficha; depois renderize o EP01 completo. Confira ausência de sobreposição, leitura, escala, rótulos, estado de final em aberto e sincronização. Verifique duração orientada pelo áudio, codec, dimensões, fps, primeiro/último quadro e integridade do áudio. Diferencie inspeção técnica de escuta subjetiva; relate apenas verificações executadas.

Entregar EP01 MP4, capa PNG, áudio de narração separado, projeto editável, legenda para publicação e nota curta de pendências reais. Para EP02–04, entregar planejamento e estrutura prontos. Não alegar que vídeos posteriores foram finalizados se houver apenas roteiro.


# ÁUDIO RECEBIDO — USO OBRIGATÓRIO NO EP01
Arquivo: `ElevenLabs_2026-11-12T18_45_38_Matilda - Knowledgable, Professional_pre_s50_sim75_v4.mp3`.
Inspeção técnica realizada: MP3, 44.100Hz, mono, duração de contêiner 57,0775s. Esta inspeção não constitui escuta subjetiva nem transcrição. Não há timestamps por palavra medidos nesta entrega.

O arquivo será anexado pelo usuário ao ambiente de produção. O caminho nesta conversa não garante acesso no Codex: `/workspace/scratch/e24c438c9e1d/upload/ElevenLabs_2026-11-12T18_45_38_Matilda - Knowledgable, Professional_pre_s50_sim75_v4.mp3`. Localize pelo nome real entre os materiais entregues. Copie preservando o original e use um nome de trabalho simples como `EP01_Narracao_Aprovada.mp3`.

A medição sugere cerca de 59,1s com assinatura de 2s, aproximadamente 1773 frames a 30fps como estimativa inicial. A duração exata da composição precisa ser definida após conferir início/fim audíveis e eventual silêncio final; não truncar fonemas nem acelerar a voz. A capa ocupa os primeiros 2s da mesma timeline, com a fala já começando: não adicionar 2s de silêncio antes da voz.

Transcreva/alinha a gravação com ferramenta local disponível e confira nomes e números. O áudio é a referência de montagem. O texto aprovado abaixo orienta os marcos, mas não é transcrição verificada. Se a gravação diferir, registre a diferença e ajuste o gráfico à fala efetiva sem inventar sincronização. Não afirmar que ouviu ou revisou pronúncias sem fazê-lo.

# TEXTO APROVADO DE REFERÊNCIA
Invicto até a final da Copa do Brasil e décimo oitavo no Brasileirão.

Na Copa do Brasil de dois mil e vinte e seis, o Grêmio eliminou Mirassol nas oitavas, Inter nas quartas e Atlético Mineiro na semifinal.

Mas esteve no zê quatro em oito das trinta e quatro rodadas do Brasileiro. O aproveitamento é de trinta e seis vírgula sete por cento, contra mais de setenta e cinco na Copa do Brasil.

O Grêmio chega à final com uma mão perto da taça e a corda no pescoço.

Já o Vasco chegou às semifinais da Copa do Brasil e da Sul-Americana, mas passou doze das trinta e quatro rodadas na zona de rebaixamento.

Atualmente, é o décimo terceiro colocado, quatro pontos acima do décimo sétimo.

No Brasileiro, o aproveitamento é de quarenta e um por cento. Nas duas copas juntas, sessenta e três.

Qual é a sua opinião? Como você explicaria essa diferença?

# PRIORIDADES FINAIS
A duração de aproximadamente 59–60s do EP01 substitui os antigos limites de 40s deste piloto. Não cortar fatos da voz para caber no limite antigo. Produzir apenas o EP01 até consolidar o sistema, mantendo planejamento dos outros episódios. Os assets gráficos e fotos ainda precisam ser disponibilizados no ambiente de produção. Ausências de assets essenciais devem ser informadas; não presumir que anexos de outra conversa foram transferidos.
