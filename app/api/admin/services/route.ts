import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(services);
  } catch (error: any) {
    console.error("Services fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch services",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, category, image } = body;

    // Validation
    if (!name || !description || !category) {
      return NextResponse.json(
        { error: "Name, description, and category are required" },
        { status: 400 }
      );
    }

    if (!["Aesthetic", "Dental"].includes(category)) {
      return NextResponse.json(
        { error: "Category must be either 'Aesthetic' or 'Dental'" },
        { status: 400 }
      );
    }

    // Check if service already exists
    const existing = await prisma.service.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A service with this name already exists" },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        category,
        image: image || null,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    console.error("Service creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create service",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
