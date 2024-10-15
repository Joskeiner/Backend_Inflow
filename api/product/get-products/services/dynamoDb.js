import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import "dotenv/config";

const client = new DynamoDBClient({});

export async function GetAllProducts() {
  let count;
  let items;
  const input = {
    TableName: process.env.TABLE,
    Select: process.env.SELECT,
    ConsistentRead: process.env.READ,
  };
  const command = new ScanCommand(input);

  const response = await client.send(command);
  if (response.$metadata.httpStatusCode == 200) {
    count = response.Count;
    items = response.Items;
    return { count, items };
  } else {
    console.log(`ERROR DYANMO:${JSON.stringify(response)} `);
    return [];
  }
}
