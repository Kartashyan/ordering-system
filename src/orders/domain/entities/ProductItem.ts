export class ProductItem {
  readonly quantity: number;
  readonly name: string;
  readonly price: number;
  private constructor(quantity: number, name: string, price: number) {
    this.quantity = quantity;
    this.name = name;
    this.price = price;
  }
  static create(name: string, quantity: number, price: number) {
    if (quantity <= 0) {
      throw new Error(`quantity number <${quantity}> should be positive`);
    }
    if (name.length === 0) {
      throw new Error(`name <${name}> should not be empty`);
    }
    return new ProductItem(quantity, name, price);
  }
}
