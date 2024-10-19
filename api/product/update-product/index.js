import Product from "./models/models.js";


// codigo de joski no tocar 

/* export const handler = async (event) => {
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
}; */

import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  const { id } = event.pathParameters; 

  const { name, category, amount, price } = JSON.parse(event.body);

  try {
    const result = await client.send(new UpdateCommand({
      TableName: " ", // nombre de tu tabla
      Key: { id }, 
      UpdateExpression: `set name = :name, category = :category, amount = :amount, price = :price`,
      ExpressionAttributeValues: {
        ':name': name,
        ':category': category,
        ':amount': amount,
        ':price': price
      },
      ReturnValues: 'ALL_NEW' // Esto te devuelve el nuevo estado del elemento
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Producto modificado exitosamente',
        updatedItem: result.Attributes // Devuelve el nuevo item actualizado
      })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al modificar el producto',
        error: error.message
      })
    };
  }
};
