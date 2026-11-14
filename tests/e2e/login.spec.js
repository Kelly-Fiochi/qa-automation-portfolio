const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { users } = require('../../data/users');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login com usuário válido', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('usuário bloqueado vê mensagem de erro', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('senha inválida mostra erro', async () => {
    await loginPage.login(users.standard.username, 'senha_errada');
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  test('campos vazios exigem usuário', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });
});