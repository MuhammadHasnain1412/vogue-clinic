import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error("Contacts fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch contacts",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
