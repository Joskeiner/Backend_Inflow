import { ClearBody } from "./ParserModels/Schema.js";
import { createProduct } from "./services/dynamoDB.js";
import { parserImages } from "./ParserModels/parserImage.js";
import { uploadObject } from "./services/s3.js";
import { parserText } from "./ParserModels/parserText.js";
import "dotenv/config";

export const handler = async (event) => {
  let response;

  let { result, textResult } = await parserImages(event, 10000000);
  let file = result.files[0];

  let product = parserText(textResult);
  product.amount = Number(product.amount);
  product.category = Number(product.category);
  product.price = Number(product.price);

  let responseValidate = ClearBody(product);

  if (responseValidate) {
    const responseS3 = await uploadObject(
      file.filename.filename,
      file.content,
      file.mimetype
    );

    console.log(` VIEW FILES CONTENT: ${JSON.stringify(result)}`);
    console.log(` VIEW PRODUCT: ${JSON.stringify(textResult)}`);
    console.log(` VIEW PRODUCT: ${JSON.stringify(product)}`);
    let responseProduct = await createProduct(product, responseS3);

    console.log(
      `Respuesta de la funcion create product : ${JSON.stringify(
        responseProduct
      )}`
    );

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

  response = {
    statusCode: 200,
    body: JSON.stringify(product),
  };
  return response;
};
