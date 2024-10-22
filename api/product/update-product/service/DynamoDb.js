import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import "dotenv/config";

const client = new DynamoDBClient({});

export async function UpdateProduct(id, entity) {
  entity.category = String(entity.category);
  entity.amount = String(entity.amount);
  entity.price = String(entity.price);

  let items = await findIdItems(id);

  //   console.log(`ITEMS DESDE UPDATE : ${JSON.stringify(items.image.S)}`);
  const commnad = new PutItemCommand({
    TableName: process.env.TABLE,
    Item: {
      id: {
        S: id,
      },
      name: {
        S: entity.name,
      },
      description: {
        S: entity.description,
      },
      category: {
        N: entity.category,
      },
      amount: {
        N: entity.amount,
      },
      price: {
        N: entity.price,
      },
      image: {
        S: items.image.S,
      },
    },
  });

  const response = await client.send(commnad);

  return response;
}

async function findIdItems(Id) {
  const commnad = new GetItemCommand({
    TableName: process.env.TABLE,
    Key: {
      id: {
        S: Id,
      },
    },
  });

  const response = await client.send(commnad);

  return response.Item;
}
