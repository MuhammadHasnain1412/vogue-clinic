import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("Bookings fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch bookings",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
