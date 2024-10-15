import { GetAllProducts } from "./services/dynamoDb.js";

export const handler = async (event) => {
  let response;

  const { count, items } = await GetAllProducts();

  console.log(`DYANMO:${JSON.stringify(items)} `);
  console.log(`DYANMO:${JSON.stringify(count)} `);
  return (response = {
    statusCode: 200,
    body: JSON.stringify(items),
  });
};
