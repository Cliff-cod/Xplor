import { config } from "dotenv";
config({ path: ".env.local" });

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "../lib/dynamodb";
import { mockExperiences } from "../lib/mock-data";

const workingImages: Record<string, string[]> = {
  exp1: [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  ],
  exp2: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  ],
  exp3: [
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
    "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800",
  ],
  exp4: [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
  ],
  exp5: [
    "https://images.unsplash.com/photo-1504609774528-69473fb4f0fd?w=800",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
  ],
  exp6: [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800",
  ],
  exp7: [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
    "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  ],
};

async function seed() {
  for (const exp of mockExperiences) {
    await docClient.send(
      new PutCommand({
        TableName: TABLES.EXPERIENCES,
        Item: {
          ...exp,
          images: workingImages[exp.id] || exp.images,
        },
      })
    );
    console.log(`✅ Seeded: ${exp.title}`);
  }
  console.log("🎉 Done!");
}

seed();