import z from "zod";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import cryto from "crypto";

export const handler = async (event) => {
  // let responseProduct,
  //   code = ClearBody(event.body);

  // if (code != 200) {
  //   return sendResponse(
  //     400,
  //     "ERRR: se producjo un error al procesar los datos"
  //   );
  // }

  let response = await createProduct(event.body);
  // console.log(`Respueta de la funcion clearBody : ${responseProduct}`);
  // const response = {
  // statusCode: 200,
  // body: {responseProduct},
  // };
  // // console.log("RESPUESTA de la request:  " + response);
  // return response.body;
  return response;
};

/**
 * schema for validate product
 */
const productSchema = z.object({
  name: z.string({
    invalid_type_error: "el nombre del producto tiene que ser string",
    required_error: "nombre del producto es requerido",
  }),
  description: z.string({
    invalid_type_error: "la descripcion  del producto tiene que ser string",
    required_error: "la descripcion  del producto es requerido",
  }),
  category: z.number().int().positive(),
  amount: z.number().positive(),
  image: z.string(),
});

/**
 * this function clean body and params verficate
 * @param {event.body} body
 */
function ClearBody(body) {
  // console.log(`BODY: dentro de la  funcion clearBody : ${body}`);

  let product = JSON.parse(body);

  let response = productSchema.safeParse(product);

  console.log(`VALIDACION DE ESQUEMA : ${{ response }}`);

  if (!response.success) {
    console.log(`ERROR : validacion denegada ${response}`);
    return {}, 400;
  } else {
    console.log(`VALIDACION CORRECTA: ${response.data.amount}`);
    return response.data, 200;
  }
}

// funcion para para poner los datos en dynamodb
/**
 * @param {object} product
 */
async function createProduct(product) {
  /**
   * @constant {DynamoDBClient} client
   */
  let data = JSON.parse(product);
  let id = crypto.randomUUID;

  console.log(`LOG DE DATA : ${data.name}`);
  const client = new DynamoDBClient({});
  let command = new PutItemCommand({
    TableName: "product",
    Item: {
      id: {
        S: data.id,
      },
      name: {
        S: data.name,
      },
    },
  });
  /**
   * @var {PutItemCommandOutput} response
   */
  let response = await client.send(command);
  console.log(`RESPUESTA DE DYNAMO : ${response.$metadata.httpStatusCode}`);

  if (response.$metadata.httpStatusCode == 201) {
    return sendResponse(201, "Se creo con exito el producto !! ", response);
  } else {
    return sendResponse(response.$metadata.httpStatusCode, " ", response);
  }
}

/**
 * this function send petition
 * @param {number} code
 * @param {string} msg
 * @param {object} [body={}]
 * @returns
 */
function sendResponse(code, msg, body = {}) {
  return {
    statusCode: code,
    body: body,
    msg: msg,
  };
}

// funcion para enviar una imagen al s3 y ligarlo con el cloudfront
