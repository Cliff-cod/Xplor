import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "@/lib/dynamodb";

export async function GET() {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLES.EXPERIENCES })
    );
    return NextResponse.json(result.Items || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}