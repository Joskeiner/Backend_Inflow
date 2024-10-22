import z from "zod";
import Product from "./models.js";

/**
 * schema for validate product update
 */

export const updatePorductSchema = z.object({
  name: z.string({
    invalid_type_error: "el nombre del producto tiene que ser string",
    required_error: "nombre del producto es requerido",
  }),
  description: z.string({
    invalid_type_error: "la descriocion  del producto tiene que ser string",
    required_error: "la descripcion  del producto es requerido",
  }),
  category: z
    .number()
    .int({
      invalid_type_error:
        " la categoria  del producto tiene que ser numero entero",
      required_error: "la categoria del producto es requerido",
    })
    .positive({
      invalid_type_error:
        " la categoria  del producto tiene que ser numero entero positivo",
    }),
  amount: z
    .number({
      invalid_type_error: "la cantidad  del producto tiene que ser numero",
      required_error: "la cantidad del producto es requerido",
    })
    .positive({
      invalid_type_error:
        "la cantidad  del producto tiene que ser numero positivo",
    })
    .int({
      invalid_type_error:
        "la cantidad  del producto tiene que ser numero entero",
    }),
  price: z
    .number({
      invalid_type_error: "el precio del producto tiene que ser numero",
      required_error: "el precio del producto es requerido",
    })
    .positive({
      invalid_type_error:
        "el precio del producto tiene que ser numero positivo",
    }),
});

/**
 * this function clean body and params check
 * @param {Product} body
 */
export function ClearBody(body) {
  // console.log(`BODY: dentro de la  funcion clearBody : ${body}`);

  let response = updatePorductSchema.safeParse(body);

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
