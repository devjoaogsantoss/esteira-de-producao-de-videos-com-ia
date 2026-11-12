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

- `Entre-a-Taca-e-a-Degola/`: série organizada por episódios; EP01 produzido, EP02–04 planejados.
- `PLAYOFF ACESSO SERIE B-A/`: projeto, identidade e referência gráfica V2.
- `Raphinha/`: projeto e histórico de versões.
- `Raphinha 2026/`: fotos, planilha e referências recebidas para aquela pauta.
- `.agents/skills/`: instruções locais utilizadas no fluxo.

Foram preservados código, briefings, manuais, ativos, telas e entregas. Dependências instaladas, modelos de transcrição, caches, builds e renders temporários de `review/` ficam fora do repositório; são regenerados localmente. As junções de `node_modules` do workspace original não são transportadas: instale as dependências dentro do projeto escolhido.

Credenciais de voz são configuradas no ambiente. O `.env.example` contém somente nomes de variáveis. Os ativos de marca, fotos, trilhas e escudos mantêm sua origem e os registros dos projetos; não foi atribuída uma licença geral aos materiais de terceiros.
