import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { users } from '../../data/users.js';
import { produtos, cliente } from '../../data/checkoutData.js';

test.describe('Carrinho e checkout', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('adiciona um produto ao carrinho', async () => {
    await inventoryPage.addToCart(produtos.mochila);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toContainText('Sauce Labs Backpack');
  });

  test('adiciona dois produtos ao carrinho', async () => {
    await inventoryPage.addToCart(produtos.mochila);
    await inventoryPage.addToCart(produtos.luz);

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveCount(2);
  });

  test('remove um produto do carrinho', async () => {
    await inventoryPage.addToCart(produtos.mochila);
    await inventoryPage.openCart();

    await cartPage.removeItem(produtos.mochila);

    await expect(cartPage.items).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('finaliza a compra com dados válidos', async () => {
    await inventoryPage.addToCart(produtos.mochila);
    await inventoryPage.openCart();
    await cartPage.startCheckout();

    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
    await checkoutPage.fillCustomerInfo(cliente);

    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await checkoutPage.finish();

    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('exibe o subtotal correto na revisão do pedido', async () => {
    await inventoryPage.addToCart(produtos.mochila); // 29.99
    await inventoryPage.addToCart(produtos.luz); // 9.99
    await inventoryPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.fillCustomerInfo(cliente);

    await expect(checkoutPage.subtotal).toContainText('$39.98');
  });

  const camposObrigatorios = [
    { campo: 'primeiro nome', dados: { ...cliente, firstName: '' }, erro: 'First Name is required' },
    { campo: 'sobrenome', dados: { ...cliente, lastName: '' }, erro: 'Last Name is required' },
    { campo: 'CEP', dados: { ...cliente, postalCode: '' }, erro: 'Postal Code is required' },
  ];

  for (const { campo, dados, erro } of camposObrigatorios) {
    test(`não finaliza sem ${campo}`, async () => {
      await inventoryPage.addToCart(produtos.mochila);
      await inventoryPage.openCart();
      await cartPage.startCheckout();

      await checkoutPage.fillCustomerInfo(dados);

      await expect(checkoutPage.errorMessage).toContainText(erro);
    });
  }
});