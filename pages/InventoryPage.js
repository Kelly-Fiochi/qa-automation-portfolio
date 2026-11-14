export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addToCart(slug) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug) {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}