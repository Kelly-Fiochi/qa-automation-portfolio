# QA Automation Portfolio

[![Playwright Tests](https://github.com/Kelly-Fiochi/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Kelly-Fiochi/qa-automation-portfolio/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/-Playwright-%232EAD33?style=flat&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white)

Projeto de automação de testes que cobre **E2E web** e **API REST**, usando **Playwright**, **Page Object Model** e execução em **CI com GitHub Actions**.

Foi criado para demonstrar, em código público, práticas que uso no dia a dia como QA: organização de testes, cenários positivos e negativos, massa de dados controlada e foco em testes estáveis.

📊 **[Ver o último relatório de testes](https://kelly-fiochi.github.io/qa-automation-portfolio/)**

---

## O que é testado

| Frente | Sistema | Cobertura |
|---|---|---|
| E2E web | [Sauce Demo](https://www.saucedemo.com) | Login, carrinho e checkout |
| API | [ServeRest](https://serverest.dev) | Usuários, login (token) e produtos |

### Cenários E2E (12)
- **Login:** usuário válido, usuário bloqueado, senha inválida e campos vazios.
- **Carrinho:** adicionar um produto, adicionar dois produtos e remover produto.
- **Checkout:** compra completa com dados válidos, conferência do subtotal e validação de campos obrigatórios (nome, sobrenome e CEP).

### Cenários de API (12)
- **Usuários:** cadastro, e-mail duplicado, busca por id, id inexistente, id em formato inválido, exclusão, login válido e login com senha errada.
- **Produtos (com autenticação por token Bearer):** cadastro por administrador, cadastro sem token (401), nome duplicado (400) e usuário comum sem permissão (403).

O plano completo, com IDs e resultados esperados, está em [`docs/plano-de-testes.md`](docs/plano-de-testes.md).

---

## Decisões técnicas

- **Page Object Model:** seletores e ações de cada tela ficam em classes (`pages/`). Se a interface mudar, o ajuste é feito em um lugar só.
- **Seletores estáveis:** uso de `data-test` via `getByTestId`, em vez de classes CSS ou XPath frágil.
- **Dados de teste separados do código:** usuários e produtos em `data/`, e geração de dados únicos na API (`utils/userFactory.js`) para evitar colisão entre execuções.
- **Testes independentes:** cada teste prepara e remove os próprios dados, então a ordem de execução não importa.
- **Sem `sleep` fixo:** esperas automáticas do Playwright e asserções com retry. Quando um teste mostrou instabilidade no WebKit, a correção foi validar o valor de cada campo antes de continuar.
- **Testes parametrizados:** os campos obrigatórios do checkout são gerados a partir de uma lista de cenários, sem repetir código.
- **Cenários negativos:** além do caminho feliz, cobertura de erros de validação, ausência de token (401) e falta de permissão (403).
- **Projects separados:** E2E rodam em Chromium, Firefox e WebKit; API roda em um project próprio, sem navegador.
- **Relatório sempre publicado:** a pipeline publica o relatório HTML mesmo quando algum teste falha, que é quando ele é mais útil.

---

## Estrutura do projeto

```
qa-automation-portfolio/
├── .github/workflows/playwright.yml   # pipeline de CI
├── data/                              # dados de teste
│   ├── users.js
│   └── checkoutData.js
├── docs/
│   ├── plano-de-testes.md
│   └── estudos.md
├── pages/                             # Page Objects
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── api/
│   │   ├── usuarios.spec.js
│   │   └── produtos.spec.js
│   └── e2e/
│       ├── login.spec.js
│       └── checkout.spec.js
├── utils/
│   └── userFactory.js
└── playwright.config.js
```

---

## Como rodar

**Pré-requisitos:** Node.js (LTS) e Git.

```bash
# 1. Clonar e instalar
git clone https://github.com/Kelly-Fiochi/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install

# 2. Rodar tudo
npx playwright test

# 3. Rodar por frente
npx playwright test --project=chromium   # E2E no Chromium
npx playwright test --project=api        # API

# 4. Ver o navegador durante o teste
npx playwright test --project=chromium --headed

# 5. Abrir o relatório HTML
npx playwright show-report
```

Para depurar um teste passo a passo: `npx playwright test --ui` ou `--debug`.

---

## Integração contínua

A pipeline do GitHub Actions (`.github/workflows/playwright.yml`) roda a cada push, a cada pull request e também manualmente.

1. **Instala as dependências** com `npm ci`, que respeita exatamente as versões do `package-lock.json`.
2. **Instala os navegadores** do Playwright com as bibliotecas do sistema.
3. **Executa toda a suíte** (E2E nos três navegadores e API).
4. **Publica o relatório HTML** no GitHub Pages, mesmo quando há falhas.

O status da última execução aparece no selo no topo deste README, e o relatório mais recente está [aqui](https://kelly-fiochi.github.io/qa-automation-portfolio/).

---

## Próximos passos

- [x] Publicar o relatório HTML no GitHub Pages
- [ ] Testes que combinam API e E2E (preparar dados pela API e validar na tela)
- [ ] Reaproveitar sessão de login com `storageState`
- [ ] Testes de contrato de API
- [ ] Execução em dispositivos móveis emulados

---

## Sobre mim

**Kelly Fiochi** · QA Analyst com foco em automação de testes (web, API e mobile).

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kelly%20Fiochi-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/kelly-fiochi-937574235/)
[![GitHub](https://img.shields.io/badge/GitHub-Kelly--Fiochi-121011?style=flat&logo=github)](https://github.com/Kelly-Fiochi)

> Os sistemas testados (Sauce Demo e ServeRest) são ambientes públicos criados para prática de testes.