# Estudos do projeto

Anotações com as minhas palavras sobre o que aprendi em cada fase do projeto.
Usar como revisão antes de entrevistas.

---

## Visão geral do projeto

- **Objetivo:** portfólio de automação de testes com Playwright cobrindo E2E web, API e CI.
- **Alvos de teste:** Sauce Demo (web) e ServeRest (API).
- **Por que Playwright:** ✍️ (escrever o motivo, comparando com o Cypress que usei na Afya)

---

## Fase 1: Setup e login (E2E)

### Conceitos
- **Page Object Model:** ✍️ o que é e por que usei
- **Locators e `getByTestId`:** ✍️ como funciona e relação com o `data-cy` do Checkout
- **Auto-wait e asserções com retry:** ✍️ por que quase não preciso de `sleep`
- **`beforeEach` e `describe`:** ✍️ para que servem
- **Dados de teste separados (`data/users.js`):** ✍️ vantagem

### Cenários cobertos
- Login válido
- Usuário bloqueado
- Senha inválida
- Campos vazios

### Como explicar na entrevista
> ✍️ resumo de 3 ou 4 frases, falando como se fosse para o entrevistador

---

## Fase 2: Carrinho e checkout (E2E)

(preencher quando concluir)

---

## Fase 3: Testes de API (ServeRest)

### Conceitos
- **Fixture `request`:** ✍️ como faz requisições sem abrir navegador
- **Status code + corpo da resposta:** ✍️ por que valido os dois
- **401 x 403:** ✍️ diferença entre não autenticado e sem permissão
- **Token Bearer:** ✍️ como o login devolve o token e como ele é usado
- **Massa de dados única e limpeza:** ✍️ por que cada teste cria e apaga seus dados
- **Swagger:** ✍️ como usei a documentação para escrever os testes

### Cenários cobertos
- Usuários: cadastro, e-mail duplicado, busca, busca inexistente, exclusão, login válido e inválido
- Produtos: cadastro por admin, sem token, nome duplicado, usuário comum

### Como explicar na entrevista
> ✍️ resumo

---

## Fase 4: E2E + API juntos

(preencher quando concluir)

---

## Fase 5: CI e relatório

(preencher quando concluir)

---

## Perguntas de entrevista e minhas respostas

**Por que usar Page Object?**
✍️

**Qual a diferença entre Playwright e Cypress?**
✍️ (usar o que vi na prática)

**Como evitar testes instáveis (flaky)?**
✍️

**Qual a diferença entre testar API e testar a tela?**
✍️

**Como garantir que um teste de API não afeta outro?**
✍️

**Para que serve teste de contrato?**
✍️

---

## Dúvidas e erros que resolvi

| Problema | Causa | Como resolvi |
|---|---|---|
| `npm` não reconhecido | PATH do terminal não atualizado | Atualizei o PATH da sessão / reiniciei o terminal |
| ✍️ | ✍️ | ✍️ |