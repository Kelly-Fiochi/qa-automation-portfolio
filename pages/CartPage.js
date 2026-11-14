export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async removeItem(slug) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}