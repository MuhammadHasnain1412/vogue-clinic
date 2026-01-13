import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalBookings, todayBookings, totalContacts] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.contact.count(),
    ]);

    // For now, pending bookings is same as today's bookings
    // You can add a status field to the Booking model later
    const pendingBookings = todayBookings;

    return NextResponse.json({
      totalBookings,
      todayBookings,
      totalContacts,
      pendingBookings,
    });
  } catch (error: any) {
    console.error("Stats error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
