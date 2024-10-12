import z from "zod";
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
  price: z.number().int(),
});
/**
 * this function clean body and params check
 * @param {event.body} body
 */
export function ClearBody(body) {
  // console.log(`BODY: dentro de la  funcion clearBody : ${body}`);

  let product = body;

  let response = productSchema.safeParse(product);

  console.log(`VALIDACION DE ESQUEMA : ${JSON.stringify(response)}`);

  if (!response.success) {
    console.log(
      `ERROR : validacion denegada ${JSON.stringify(response.error)}`
    );
    return false;
  } else {
    console.log(`VALIDACION CORRECTA !!!!`);
    return true;
  }
}
