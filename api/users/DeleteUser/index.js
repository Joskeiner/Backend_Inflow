import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Validación de la entrada: obtención del parámetro 'dni' desde pathParameters
        const dni = event.pathParameters?.dni;

        if (!dni) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El parámetro 'dni' es requerido" }),
            };
        }

        if (typeof dni !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El parámetro 'dni' debe ser una cadena" }),
            };
        }

        const command = new DeleteCommand({
            TableName: " ",
            Key: { dni }, // Asumiendo que la clave primaria es 'dni'
        });

        const response = await ddbDocClient.send(command);

        // Verificar si se eliminó el ítem
        if (response.$metadata.httpStatusCode === 200) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Usuario eliminado exitosamente" }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Usuario no encontrado" }),
            };
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor", error: error.message }),
        };
    } 
};