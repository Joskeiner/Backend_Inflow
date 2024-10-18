import Product from "./models/models.js";

export const handler = async (event) => {
  let response;
  let id = event.rawQueryString;
  let product = JSON.parse(event.body);
  let products = new Product(
    event.body.name,
    event.body.description,
    event.body.amount,
    event.body.category,
    event.body.price
  );
  console.log(`EVENT ID  ${JSON.stringify(id)}`);
  console.log(`EVENT BODY  ${JSON.stringify(product)}`);
  console.log(`PRODUCTS  ${JSON.stringify(products)}`);
  return (response = {
    statusCode: 200,
    body: JSON.stringify("hello world from lambda put"),
  });
};
