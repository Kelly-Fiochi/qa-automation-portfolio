# Plano de Testes

Plano de testes do projeto **qa-automation-portfolio**.

- **Responsável:** Kelly Fiochi
- **Ferramenta:** Playwright (JavaScript)
- **Repositório:** https://github.com/Kelly-Fiochi/qa-automation-portfolio

---

## 1. Objetivo

Validar, de forma automatizada, fluxos críticos de uma aplicação web e de uma API REST,
com testes repetíveis, independentes e executados em pipeline de CI.

## 2. Escopo

### Dentro do escopo
| Frente | Sistema | O que é testado |
|---|---|---|
| E2E web | Sauce Demo (https://www.saucedemo.com) | Login; carrinho e checkout (Fase 2, pendente) |
| API | ServeRest (https://serverest.dev) | Usuários, login e produtos |

### Fora do escopo
- Testes de performance, carga e segurança
- Testes de acessibilidade
- Testes mobile nativos
- Validação visual (layout pixel a pixel)

## 3. Estratégia de testes

| Nível | Abordagem | Ferramenta |
|---|---|---|
| E2E | Fluxos do usuário pela interface, usando Page Object Model | Playwright |
| API | Requisições HTTP diretas, validando status code e corpo da resposta | Playwright (`request`) |
| Regressão | Toda a suíte roda a cada push | GitHub Actions |

**Tipos de cenário:** positivos (caminho feliz) e negativos (dados inválidos, ausência de token, falta de permissão, recurso inexistente).

**Boas práticas adotadas:**
- Page Object Model para separar seletores e ações dos testes
- Dados de teste separados do código (`data/`) e gerados dinamicamente na API (`utils/`)
- Testes independentes entre si, cada um cria e remove os próprios dados
- Esperas automáticas e asserções com retry, sem `sleep` fixo

## 4. Ambiente de teste

| Item | Valor |
|---|---|
| Navegadores (E2E) | Chromium, Firefox e WebKit |
| API | Execução sem navegador |
| Execução | Local (`npx playwright test`) e CI (GitHub Actions) |
| Relatório | HTML do Playwright |
| Dados | Usuários públicos do Sauce Demo; dados descartáveis gerados no ServeRest |

## 5. Casos de teste

### 5.1 Login (E2E)
| ID | Cenário | Resultado esperado | Tipo | Arquivo |
|---|---|---|---|---|
| E2E-01 | Login com usuário válido | Redireciona para a página de produtos | Positivo | `tests/e2e/login.spec.js` |
| E2E-02 | Login com usuário bloqueado | Exibe mensagem de usuário bloqueado | Negativo | `tests/e2e/login.spec.js` |
| E2E-03 | Login com senha inválida | Exibe mensagem de credenciais incorretas | Negativo | `tests/e2e/login.spec.js` |
| E2E-04 | Login com campos vazios | Exibe mensagem de usuário obrigatório |~çç={
    {
}