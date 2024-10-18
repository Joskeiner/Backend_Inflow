/**
 * models for parser to data event
 */
export default class Product {
  constructor(name, description, amount, category, price) {
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.price = price;
  }
}
