/**
 *
 * @param {Array<object>} text
 * @returns {object}
 */
export function parserText(text) {
  let product = {};
  for (let i = 0; i < text.length; i++) {
    switch (text[i].parameter) {
      case "name":
        console.log(`psarse ${text[i].pamater}`);
        product.name = text[i].value;
        continue;
      case "description":
        console.log(`psarse ${text[i].pamater}`);
        product.description = text[i].value;

        continue;
      case "category":
        console.log(`psarse ${text[i].pamater}`);
        product.category = text[i].value;
        continue;
      case "amount":
        console.log(`psarse ${text[i].pamater}`);
        product.amount = text[i].value;
        continue;
      case "price":
        console.log(`psarse ${text[i].pamater}`);
        product.price = text[i].value;
        continue;
    }
  }
  return product;
}
