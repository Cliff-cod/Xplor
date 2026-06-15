import { config } from "dotenv";
config({ path: ".env.local" });

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "../lib/dynamodb";

async function fix() {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLES.EXPERIENCES,
      Key: { id: "exp5" },
      UpdateExpression: "SET images = :images",
      ExpressionAttributeValues: {
        ":images": [
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
          "https://images.unsplash.com/photo-1545431781-3e1b506e9a37?w=800",
        ],
      },
    })
  );
  console.log("Fixed exp5 images!");
}

fix();