import { config } from "dotenv";
config({ path: ".env.local" });

import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "../lib/dynamodb";

async function check() {
  const result = await docClient.send(
    new ScanCommand({ TableName: TABLES.EXPERIENCES })
  );
  result.Items?.forEach((item) => {
    console.log(`${item.id}: ${item.images?.[0]}`);
  });
}

check();