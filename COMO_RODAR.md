# Como abrir e produzir

Cada pauta tem seu próprio projeto Remotion. A identidade e o fluxo estão documentados na [referência técnica](REFERENCIA_TECNICA_VIDEOS.md) e no [briefing-base](BRIEFING_NOVO_VIDEO.md).

## Abrir o EP01

Com Node.js e npm instalados:

```sh
cd Entre-a-Taca-e-a-Degola
npm ci
npm run studio
```

No Studio, a composição `Entre-a-Taca-e-a-Degola-EP01` é o vídeo completo. `EP01-Telas-Aprovacao` reúne as telas, e `EP01-Estudo-Movimento` mostra os estudos animados. A propriedade `screen` seleciona a tela de 0 a 10.

O MP4 e a página local de reprodução estão em `episodes/EP01-Gremio-Vasco-2026/entrega/final/`. Baixe o repositório para abrir os HTMLs no navegador; o GitHub exibe o código dessas páginas.

Para gerar novamente:

```sh
npm run check
npm run prepare:film
npm run telas
npm run render:trecho
npm run render:final
```

O áudio aprovado, os assets e os tempos estão no projeto. O README de cada pauta detalha seus comandos e entregas.

## Organização

- `Entre-a-Taca-e-a-Degola/`: série organizada por episódios; EP01 e EP02 produzidos; EP03–04 planejados.
- `PLAYOFF ACESSO SERIE B-A/`: projeto, identidade e referência gráfica V2.
- `Raphinha/`: projeto e histórico de versões.
- `Raphinha 2026/`: fotos, planilha e referências recebidas para aquela pauta.
- `.agents/skills/`: instruções locais utilizadas no fluxo.

Foram preservados código, briefings, manuais, ativos, telas e entregas. Dependências instaladas, modelos de transcrição, caches, builds e renders temporários de `review/` ficam fora do repositório; são regenerados localmente. As junções de `node_modules` do workspace original não são transportadas: instale as dependências dentro do projeto escolhido.

Credenciais de voz são configuradas no ambiente. O `.env.example` contém somente nomes de variáveis. Os ativos de marca, fotos, trilhas e escudos mantêm sua origem e os registros dos projetos; não foi atribuída uma licença geral aos materiais de terceiros.

## Continuar em outro computador

Instale Git e Node.js 24 LTS (ambiente utilizado nesta entrega), então clone o repositório:

```sh
git clone https://github.com/devjoaogsantoss/esteira-de-producao-de-videos-com-ia.git
cd esteira-de-producao-de-videos-com-ia
cd Entre-a-Taca-e-a-Degola
npm ci
npm run check
npm run studio
```

Se já tiver uma cópia, atualize-a com `git pull --ff-only` na branch `main`. No Studio, escolha `Entre-a-Taca-e-a-Degola-EP02` para o filme completo de 60,1s. As telas e os estudos estão em `EP02-Telas-Aprovacao` e `EP02-Estudo-Movimento`, com a propriedade `screen` de 0 a 9.

Para exportar o EP02 com os tempos e a mixagem já versionados:

```sh
npm run ep02:render:trecho
npm run ep02:render:final
```

Use `npm run ep02:prepare:film` somente se precisar regenerar a mixagem e os pulsos após alterar o áudio. Para revisar as telas: `npm run ep02:telas` e `npm run ep02:galeria`.

Os arquivos estão em `episodes/EP02-Palmeiras-2012/entrega/final/`: MP4, `Assistir-EP02.html`, capa, narração original, legendas opcionais e pacote editável. A voz já está incluída; não é necessário acesso à conta ElevenLabs para abrir ou renderizar o projeto. A primeira execução do Remotion pode precisar baixar seu navegador. Os modelos de transcrição ficam fora do repositório e só são necessários para transcrever uma nova locução.

## Retrospectiva executiva

A pasta `Retrospectiva-Executiva/` inclui PDF, PPTX, métricas e scripts. É possível editar diretamente o PPTX; instale Poppins para manter a tipografia. Para regenerar os documentos a partir das métricas e da auditoria agregada já incluídas:

```sh
cd ../Retrospectiva-Executiva
npm ci
node gerar.cjs
node verificar.mjs
```

Os históricos privados do Codex, seus identificadores e trechos de conversas ficam fora do repositório. Os documentos podem ser gerados com a base agregada por pauta já incluída, sem acesso a esses históricos.
