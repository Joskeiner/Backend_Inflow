export function parserProduct(items, count) {
  let products = [];
  let product = {};
  for (let i = 0; i < count; i++) {
    if (items[i] != {} || items != undefined) {
      product.id = verificateParameter(items[i].id.S);
      product.name = verificateParameter(items[i].name.S);
      product.description = verificateParameter(items[i].description.S);
      product.category = verificateParameter(items[i].category.N);
      product.price = verificateParameter(items[i].price.N);
      product.amount = verificateParameter(items[i].amount.N);
      product.image = verificateParameter(items[i].image.S);
      products.push(product);
    }
  }
  return products;
}

function verificateParameter(pamater) {
  if (pamater == undefined || pamater == "" || pamater == null) {
    return " ";
  } else {
    return pamater;
  }
}
