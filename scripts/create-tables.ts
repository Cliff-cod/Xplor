import { config } from "dotenv";
config({ path: ".env.local" });

import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

async function createTables() {
    const tables = ["wanderly-experiences", "wanderly-bookings", "wanderly-users"];

    for (const TableName of tables) {
        try {
            await client.send(
                new CreateTableCommand({
                    TableName,
                    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
                    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
                    BillingMode: "PAY_PER_REQUEST",
                })
            );
            console.log(`Created: ${TableName}`);
        } catch (err: any) {
            if (err.name === "ResourceInUseException") {
                console.log(`Already exists: ${TableName}`);
            } else {
                console.error(`Error with ${TableName}:`, err);
            }
        }
    }
}

createTables();