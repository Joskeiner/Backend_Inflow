import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));



export const handler = async (event, context) => {
    try {
        const command = new ScanCommand({
            TableName: " ", // Nombre de la tabla en DynamoDB
        });

        const response = await ddbDocClient.send(command);

        // Verificar si se obtuvieron ítems
        if (response.Items && response.Items.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Usuarios encontrados", data: response.Items }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No se encontraron usuarios" }),
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