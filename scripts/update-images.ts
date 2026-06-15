import { config } from "dotenv";
config({ path: ".env.local" });

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "../lib/dynamodb";

const imageUpdates = [
  {
    id: "exp1",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
  },
  {
    id: "exp2",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
  },
  {
    id: "exp3",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
  },
  {
    id: "exp4",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    ],
  },
  {
    id: "exp5",
    images: [
      "https://images.unsplash.com/photo-1545431781-3e1b506e9a37?w=800",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
    ],
  },
  {
    id: "exp6",
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
    ],
  },
  {
    id: "exp7",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    ],
  },
];

async function updateImages() {
  for (const item of imageUpdates) {
    await docClient.send(
      new UpdateCommand({
        TableName: TABLES.EXPERIENCES,
        Key: { id: item.id },
        UpdateExpression: "SET images = :images",
        ExpressionAttributeValues: {
          ":images": item.images,
        },
      })
    );
    console.log(`Updated images for: ${item.id}`);
  }
  console.log("All images updated!");
}

updateImages();