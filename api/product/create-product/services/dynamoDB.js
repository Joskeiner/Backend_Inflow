import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import ID from "crypto";
import "dotenv/config";

/**
 * this function obtains a product type object
 * and the image url in the bucket, the function proceeds to
 *  transform the data to the valid type for dynamo db and adds
 *  the url to the product object.
 * @param {event.body} product
 * @param {string} url
 */
export async function createProduct(product, url) {
  /**
   * @constant {DynamoDBClient} client
   */
  const client = new DynamoDBClient({});

  let id = ID.randomUUID();

  product.category = String(product.category);

  product.amount = String(product.amount);
  product.price = String(product.price);
  product.image = url;

  console.log(`LOG DE DATA : ${JSON.stringify(product)}`);

  let command = new PutItemCommand({
    TableName: process.env.TABLE,
    Item: {
      id: {
        S: id,
      },
      name: {
        S: product.name,
      },
      description: {
        S: product.description,
      },
      category: {
        N: product.category,
      },
      amount: {
        N: product.amount,
      },
      price: {
        N: product.price,
      },
      image: {
        S: product.image,
      },
    },
  });
  /**
   * @var {PutItemCommandOutput} response
   */
  let response = await client.send(command);
  console.log(`RESPUESTA DE DYNAMO : ${JSON.stringify(response)}`);

  if (response.$metadata.httpStatusCode == 200) {
    return {
      code: 201,
      msg: "El producto se creo con exito!!!",
    };
  } else {
    return {
      code: response.$metadata.httpStatusCode,
      msg: "ERROR : DATA BASE",
    };
  }
}
