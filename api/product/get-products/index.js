import { parserProduct } from "./paser_models/parser_models.js";
import { GetAllProducts } from "./services/dynamoDb.js";

export const handler = async (event) => {
  let response;

  const { count, items } = await GetAllProducts();
  const products = parserProduct(items, count);

  console.log(`DYANMO:${JSON.stringify(items)} `);
  console.log(`DYANMO:${JSON.stringify(count)} `);
  return (response = {
    statusCode: 200,
    body: JSON.stringify(products),
  });
};
