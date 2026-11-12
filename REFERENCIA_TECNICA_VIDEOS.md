# Modelo técnico de vídeos Sportsmatch / Instaplaysss

Versão 1.0 · 10/11/2026.

Adotado pelo usuário como base dos próximos vídeos neste formato, após a consolidação da revisão gráfica V2 da Série B. Este documento reúne o padrão de produção; o briefing de cada pauta define o conteúdo e pode aprovar exceções.

## 1. Referência executável

Projeto: `PLAYOFF ACESSO SERIE B-A`.

| Material | Caminho relativo a este documento |
|---|---|
| MP4 de referência vigente | `PLAYOFF ACESSO SERIE B-A/entrega/revisao-grafica/Sportsmatch-SerieB2026-GRAFICA-V2.mp4` |
| Composição vigente | `SerieB2026-Grafica-V2` |
| Elementos, títulos e diagramas | `PLAYOFF ACESSO SERIE B-A/src/GraphicRevision.tsx` |
| Montagem e sincronização | `PLAYOFF ACESSO SERIE B-A/src/GraphicFilm.tsx` |
| Capa e encerramento originais reutilizáveis | `PLAYOFF ACESSO SERIE B-A/src/Sportsmatch.tsx` |
| Comparação de títulos | `PLAYOFF ACESSO SERIE B-A/entrega/revisao-grafica/Comparacao-Titulos.png` |
| Comparação dos quadros principais | `PLAYOFF ACESSO SERIE B-A/entrega/revisao-grafica/Comparacao-Antes-Depois.png` |
| Registro da revisão aprovada | `PLAYOFF ACESSO SERIE B-A/docs/REVISAO-GRAFICA-V2.md` |
| Manuais de identidade e narrativa | `PLAYOFF ACESSO SERIE B-A/docs/Sportsmatch_Manual_Identidade_Visual_v1.md` e `Sportsmatch_Manual_Narrativa_Dados_v1.md` |

A referência consolidada é a **V2 gráfica**. As primeiras versões e os estudos A/B ficam disponíveis para comparação histórica.

## 2. Formato e identidade

| Propriedade | Padrão |
|---|---|
| Canal | Instaplaysss, salvo indicação no briefing |
| Análise e edição | Sportsmatch |
| Fontes dos dados | Identificadas separadamente da autoria |
| Tela | Vertical, 1080 × 1920 |
| Frame rate | 30fps |
| Duração | Até 50s, incluindo capa e encerramento, salvo novo briefing explícito |
| Capa | Aproximadamente 1s, estática e legível desde o primeiro quadro |
| Encerramento | 2s, com bolas pequenas de basquete, futebol e tênis, seguidas da assinatura original com quique |
| Fundo | `#020C1F` |
| Destaque | `#FF0244` |
| Texto | `#EEEEF0` |
| Títulos | Poppins Bold 700 |
| Textos e dados | Poppins 400, 600 e 700 conforme a hierarquia |

Poppins Bold passa a ser a escolha aprovada para os novos vídeos deste modelo. Os demais usos de marca continuam orientados pelos manuais. O limite de 50s é um ponto de partida do modelo e inclui todo o áudio e o encerramento. A referência tem 1494 frames / 49,8s; uma nova pauta deve ter sua própria duração, determinada pelo conteúdo e pela voz.

## 3. Hierarquia e leitura no celular

- Conteúdo crítico dentro de **x=90–900 / y=240–1500**. Fotografia e elementos decorativos podem ultrapassar essa área.
- Títulos em duas ou três linhas curtas. Preservar unidades de sentido, como “EM JOGO”. Palavra principal em rosa, com bom contraste.
- Ponto de partida dos títulos: **100–115px**; ajustar entre aproximadamente 90–115px conforme o comprimento. Na referência, “Novorizontino” usa 96px.
- Explicações: **40–46px**. Nomes de clubes: **34–42px**. Escudos: **120–160px** de altura. Fontes e créditos: **pelo menos 28px**.
- Rótulos secundários de diagramas usam escala própria, a partir de 28px, sujeitos à inspeção visual.
- Aumentar a fonte real e ajustar as quebras; preservar a proporção dos caracteres.
- Aproximar título, informação e interpretação. Reservar espaço para os movimentos e para um estado final estável.
- Conferir os quadros reduzidos a **360 × 640**, observando leitura, contraste, densidade e distinção entre status.

O estudo B da revisão é o padrão: linhas curtas e palavra-chave destacada. Novos estudos de título são úteis quando uma pauta trouxer uma dificuldade real de comprimento ou composição; não são uma etapa obrigatória em toda peça.

## 4. Fotografias e marcas

Usar as fotos fornecidas, mantendo cores naturais, enquadramento pertinente, fade escuro e blur localizado atrás da leitura. A aproximação ou o deslocamento deve ser suave e acompanhar o foco editorial.

Preservar os arquivos originais e criar cópias de trabalho no diretório servido pelo Remotion. Inspecionar os arquivos efetivos, incluindo dimensões, transparência e bordas; o nome do arquivo não basta para identificar sua função.

Usar selo circular como marca-d'água e logo horizontal original como assinatura. Manter proporções, slogan e área de proteção. Escudos, marcas e fotos factuais devem vir de ativos reais. Não redesenhar logos nem criar imagens sintéticas como prova de acontecimentos.

## 5. Narrativa visual: animar a ação

O movimento deve explicar um verbo ou uma relação da pauta. Adaptar o diagrama ao assunto.

| Relação a comunicar | Solução de referência |
|---|---|
| Subir, avançar ou classificar | Cartão cruza um limite e se acomoda em um destino identificado |
| Disputar um destino em aberto | Participantes com mesmo peso visual, caminhos convergentes e aproximação equilibrada |
| Garantir uma vaga | Ficha percorre uma conexão e ocupa o destino; usar entidade neutra para a explicação da regra |
| Ida e volta | Duas setas em sentidos opostos, com rótulos explícitos |
| Comparar desempenho | Gráfico adequado aos dados, com unidade, recorte e escala clara |
| Contextualizar uma mudança | Dado principal, interpretação identificada e fonte pertinente |

Uma regra geral pode usar posições ou fichas neutras. Uma disputa em aberto mantém o destino sem vencedor. Um resultado confirmado pode ocupar o destino com a entidade correspondente. A animação deve preservar o grau de certeza da informação.

Dar ao título aproximadamente **0,6–1s de protagonismo**, depois acomodá-lo para abrir espaço. Usar um movimento principal por vez, entradas curtas, continuidade de formas e pausas de leitura. O estado final do diagrama precisa ser compreensível com o vídeo pausado e sem som.

As cenas podem compartilhar linhas, destinos e elementos persistentes. A regra de acesso, os quatro clubes e os cruzamentos da Série B são exemplos daquela pauta; novos vídeos exigem diagramas coerentes com os novos dados.

## 6. Narração e sincronização

Definir a montagem pela **duração real da nova locução**. Reservar capa e encerramento antes de fechar o limite total. A quantidade de cenas depende do roteiro; as sete etapas da Série B são referência de ritmo.

Preferir português brasileiro com dicção clara, entonação variada e tom próximo do fã. Registrar pronúncias de siglas e nomes estrangeiros no briefing. Não acelerar excessivamente a fala para caber.

O novo vídeo precisa de nova narração compatível com seu roteiro, fornecida em WAV/MP3 ou gerada por serviço autorizado e configurado. A transcrição local disponível no projeto auxilia a localizar palavras; ela não gera voz e pode errar nomes próprios.

Localizar as palavras que comandam as ações e registrar tempos e frames. Entradas, deslocamentos e chegadas devem acompanhar essas palavras. Os frames específicos da Série B devem ser recalculados para cada gravação.

Alterações necessárias de palavras ou cortes editoriais devem ficar documentadas. Preservar o áudio original e evitar remover fonemas. Informar limitações reais de geração, pronúncia ou escuta quando existirem.

## 7. Música, mixagem e timeline

Trilha de referência: `Energetic Upbeat Percussive Clap and Stomp Background Music.mp3`, disponível em `PLAYOFF ACESSO SERIE B-A/public/audio`. Por padrão, usar essa trilha a partir de **10s**, salvo outra escolha no briefing.

- Música já audível no primeiro quadro; voz em primeiro plano.
- Reduzir a trilha durante a fala e recuperá-la nas pausas e no encerramento, com transições suaves e fade final.
- Referência de mixagem: alvo próximo de **-16 LUFS**, controle de picos e ausência de clipping. Ajustar ao material real.
- Timeline discreta de pequenos pulsos, com progresso global e resposta à energia e aos ataques da música real.
- Compartilhar o mesmo offset de áudio entre reprodução e análise. Se mudar trilha, ponto de entrada ou duração, regenerar ou ampliar os dados de análise.
- Em revisão exclusivamente gráfica, preservar o áudio aprovado. Quando possível, copiar o fluxo de áudio do MP4 anterior sem recodificação e verificar sua identidade.

O arquivo `src/music-pulse.json` da referência analisa o trecho usado daquela música. Sua validade depende da mesma faixa, offset, frame rate e extensão de dados.

## 8. Precisão editorial

Separar confirmado, atribuído, cenário e leitura editorial. Créditos precisam sustentar a afirmação exibida. Uma fonte oficial para um fato não sustenta automaticamente a votação, a projeção ou a interpretação de outra cena.

Receber as fontes, datas de corte, unidades e qualificadores relevantes para a nova pauta. Rankings, comparações e gráficos exigem metodologia coerente. Preservar as incertezas na narração e no desenho: cores, setas e destinos também podem sugerir resultados.

O crédito “Fonte: CBF” pertence aos dados daquela fonte; novos assuntos devem ter seus próprios créditos. A narração, os números, os clubes e as datas anteriores são conteúdo histórico do projeto de referência.

## 9. Implementação em Remotion

Criar uma pasta e composição próprias por nova pauta. Consultar o projeto executável e reaproveitar os elementos que funcionem, mantendo as versões aprovadas disponíveis.

O código de referência contém nomes, textos, ativos e frames específicos. Ao iniciar uma nova produção:

1. Separar conteúdo, caminhos de ativos e tempos em uma configuração da nova pauta.
2. Reutilizar os componentes visuais pertinentes e adaptar os diagramas ao novo sentido editorial.
3. Usar ativos locais com `staticFile()`, fontes fornecidas e caminhos com a capitalização real.
4. Animar por `useCurrentFrame()`, `interpolate()` e springs determinísticas; o render deve produzir o mesmo resultado em qualquer execução.
5. Manter áudio e timeline em coordenadas globais consistentes, respeitando os offsets das cenas.
6. Consultar `package.json` e lockfile antes de instalar ou alterar dependências. A referência usa Remotion **4.0.542**.

Os scripts de extração de ativos, integração de voz e render da Série B contêm caminhos e decisões daquela peça. Adaptá-los à nova configuração antes de executar. A documentação consolida o modelo; a preparação de cada pauta inclui essa adaptação do código.

## 10. Fluxo de produção e entrega

1. Ler o briefing, esta referência, os manuais e as skills pertinentes.
2. Inspecionar fontes, ativos e dependências; resolver as ausências essenciais.
3. Preparar roteiro e narração. Definir cenas e ações pela duração real da voz.
4. Abrir o Remotion Studio e implementar em composição separada.
5. Exportar quadros-chave e verificar a 360px. Fazer estudos adicionais apenas quando ajudarem a resolver uma decisão real.
6. Renderizar e revisar um trecho representativo das ações e transições.
7. Exportar o vídeo completo e verificar primeiro/último quadro, cortes, sobreposições, fontes, pronúncias, sincronização e áudio, conforme os recursos efetivamente disponíveis.
8. Verificar codec, dimensões, fps, duração e integridade da decodificação. Distinguir verificação técnica, reprodução e escuta subjetiva.

Entrega padrão: MP4 H.264/AAC, 1080×1920, 30fps; capa PNG; narração separada quando usada; projeto editável; resumo curto das decisões e das pendências reais. Incluir comparação visual quando houver revisão de uma versão anterior.

## 11. O que receber para uma nova pauta

Use `BRIEFING_NOVO_VIDEO.md`. O pacote mínimo é:

- Tema, mensagem principal e duração desejada.
- Texto de narração ou tópicos com os quais preparar o roteiro.
- Dados e fontes com datas e indicação de cenários ou interpretações.
- Fotos e logos da nova pauta, ou indicação explícita de quais ativos existentes reutilizar.
- Nova voz, ou acesso configurado ao serviço autorizado para gerá-la.
- Exceções ao padrão: canal, trilha, tom, encerramento ou chamada final.

As decisões de quebras, distribuição, tipos de diagrama, enquadramentos e movimentos podem ser executadas autonomamente dentro deste padrão.
