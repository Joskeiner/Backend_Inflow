import z from "zod";

export const handler = async (event) => {

  let responseProduct = ClearBody(event.body);

    // console.log(`Respueta de la funcion clearBody : ${responseProduct}`);
    const response = {
    statusCode: 200,
    body: {responseProduct},
    };
    // console.log("RESPUESTA de la request:  " + response);
    return response.body;
  };





/**
 * schema for validate product
 */
  const productSchema = z.object({
    name: z.string({
      invalid_type_error : 'el nombre del producto tiene que ser string',
      required_error : "nombre del producto es requerido"
    }),
    description: z.string({
      invalid_type_error : 'la descripcion  del producto tiene que ser string',
      required_error : "la descripcion  del producto es requerido"
    }),
    category : z.number().int().positive(),
    amount : z.number().int().positive(),
    image : z.string(),

  });

  // funcion para para validar datos
/**
 * this function clean body and params verficate
 * @param {event.body} body 
 */
 function ClearBody(body){

    // console.log(`BODY: dentro de la  funcion clearBody : ${body}`);

    let product = JSON.parse(body);

    let response = productSchema.safeParse(product);

    return response;
 }


  // funcion para para poner los datos en dynamodb
  // funcion para enviar una imagen al s3 y ligarlo con el cloudfront

