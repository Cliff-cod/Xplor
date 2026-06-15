import { NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "@/lib/dynamodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLES.EXPERIENCES,
        Key: { id: params.id },
      })
    );
    if (!result.Item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result.Item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}