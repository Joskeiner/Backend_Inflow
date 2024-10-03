import z from "zod";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import "dotenv/config";
import ID from "crypto";

export const handler = async (event) => {
  let response;
  let responseValidate = ClearBody(event.body);

  if (responseValidate) {
    let responseProduct = await createProduct(event.body);

    console.log(`Respuesta de la funcion create product : ${responseProduct}`);

    return (response = {
      statusCode: responseProduct.code,
      body: JSON.stringify(responseProduct.msg),
    });
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify("Hubo un error al momento de procesar su solicitud"),
    };
  }

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

  console.log(`VALIDACION DE ESQUEMA : ${response.data}`);

  if (!response.success) {
    console.log(`ERROR : validacion denegada ${response.error}`);
    return false;
  } else {
    console.log(`VALIDACION CORRECTA !!!!`);
    return true;
  }
}

// funcion para para poner los datos en dynamodb
/**
 * @param {event.body} product
 */
async function createProduct(product) {
  /**
   * @constant {DynamoDBClient} client
   */
  const client = new DynamoDBClient({});

  let data = JSON.parse(product);
  let id = ID.randomUUID();

  data.category = String(data.category);

  data.amount = String(data.amount);

  console.log(`LOG DE DATA : ${{ data }}`);

  let command = new PutItemCommand({
    TableName: process.env.TABLE,
    Item: {
      id: {
        S: id,
      },
      name: {
        S: data.name,
      },
      description: {
        S: data.description,
      },
      category: {
        N: data.category,
      },
      amount: {
        N: data.amount,
      },
    },
  });
  /**
   * @var {PutItemCommandOutput} response
   */
  let response = await client.send(command);
  console.log(`RESPUESTA DE DYNAMO : ${{ d: response.Attributes }}`);

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

// funcion para enviar una imagen al s3 y ligarlo con el cloudfront
