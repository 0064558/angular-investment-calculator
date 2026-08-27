# Calculadora de Investimentos

Aplicação Angular para simular a evolução de um investimento com aportes anuais e retorno esperado.

## Funcionalidades

- Cálculo da projeção anual do investimento.
- Comparação entre patrimônio acumulado e total investido.
- Gráfico de evolução criado com SVG.
- Resumo com patrimônio final, total investido e juros acumulados.
- Formulário com validação e mensagens de erro.
- Botão para limpar e reiniciar a simulação.
- Modo claro e escuro com preferência salva no navegador.
- Layout responsivo para desktop e dispositivos móveis.
- Formatação monetária brasileira.
- Testes unitários da regra de cálculo.

## Tecnologias

- Angular 18
- TypeScript
- HTML e CSS
- Angular Signals
- Template-driven Forms
- SVG
- Jasmine/Karma

## Conceitos praticados

- Standalone Components.
- Interpolação e bindings.
- `ngModel` e `ngSubmit`.
- Signals e `computed`.
- Services e injeção de dependência.
- Diretivas de controle `@if` e `@for`.
- Pipes, incluindo `CurrencyPipe`.
- Acessibilidade com labels, ARIA e estrutura semântica.
- CSS responsivo, temas e preferência por movimento reduzido.

## Executar localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:4200/`.

## Build

```bash
npm run build
```

## Testes

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```
