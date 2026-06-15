import { NextResponse } from "next/server";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLES } from "@/lib/dynamodb";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const booking = {
      id: randomUUID(),
      bookingReference: body.bookingReference,
      experienceId: body.experienceId,
      userId: body.userId || "user_current",
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      guestCount: body.guestCount,
      status: "confirmed",
      totalPrice: body.totalPrice,
      travelerDetails: body.travelerDetails,
      specialRequests: body.specialRequests || "",
      createdAt: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({ TableName: TABLES.BOOKINGS, Item: booking })
    );

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLES.BOOKINGS })
    );
    return NextResponse.json(result.Items || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}