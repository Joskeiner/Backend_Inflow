import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";


const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Validación de la entrada
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El cuerpo de la solicitud es requerido" }),
            };
        }

        const user = JSON.parse(event.body);

        if (!user || typeof user !== 'object' || Array.isArray(user)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El cuerpo de la solicitud debe ser un objeto JSON válido" }),
            };
        }

        // Aquí podrías añadir más validaciones específicas para los campos del usuario
        if (!user.dni || typeof user.dni !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El campo 'id' es requerido y debe ser una cadena" }),
            };
        }

        const command = new PutCommand({
            TableName: " ",
            Item: user,
        });

        const response = await ddbDocClient.send(command);

        // Enviar una respuesta exitosa
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Usuario creado exitosamente", data: response }),
        };
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error interno del servidor", error: error.message }),
        };
    }
};