import Product from "./models/models.js";
import { ClearBody } from "./models/schema.js";
import { UpdateProduct } from "./service/DynamoDb.js";

export const handler = async (event) => {
  let response;
  /**
   * @param {string} id
   */
  let id = event.rawQueryString;
  id = id.substring(3);

  const { name, category, amount, price, description } = JSON.parse(event.body);

  let products = new Product(name, description, amount, category, price);

  // console.log(`PRODUCTS  ${JSON.stringify(products)}`);
  // console.log(`ID ${JSON.stringify(id)}`);

  const checkPrameters = ClearBody(products);
  try {
    // console.log(`PARAMETER  ${checkPrameters}`);
    if (checkPrameters) {
      const responseItems = await UpdateProduct(id, products);
      return (response = {
        statusCode: 200,
        body: JSON.stringify(responseItems),
      });
    } else {
      return (response = {
        statusCode: 400,
        body: JSON.stringify("ERROR: Parameter invalid"),
      });
    }
  } catch (error) {
    return (response = {
      statusCode: 500,
      body: `error : ${error}`,
    });
  }

  // console.log(`EVENT ID  ${JSON.stringify(id)}`);
  // return (response = {
  //   statusCode: 200,
  //   body: JSON.stringify("hello world from lambda put"),
  // });
};
// borrar  esta libreria en caso de que no sirva @aws-sdk/lib-dynamodb
// import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import "dotenv/config";
// const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// export const handler = async (event) => {
//   const { id } = event.pathParameters;

//   const { name, category, amount, price } = JSON.parse(event.body);

//   try {
//     const result = await client.send(
//       new UpdateCommand({
//         TableName: process.env.TABLE, // nombre de tu tabla
//         Key: { id },
//         UpdateExpression: `set name = :name, category = :category, amount = :amount, price = :price`,
//         ExpressionAttributeValues: {
//           ":name": name,
//           ":category": category,
//           ":amount": amount,
//           ":price": price,
//         },
//         ReturnValues: "ALL_NEW", // Esto te devuelve el nuevo estado del elemento
//       })
//     );

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: "Producto modificado exitosamente",
//         updatedItem: result.Attributes, // Devuelve el nuevo item actualizado
//       }),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "Error al modificar el producto",
//         error: error.message,
//       }),
//     };
//   }
// };
