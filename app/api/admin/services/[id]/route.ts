import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET single service
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("Service fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch service",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, category, isActive, image } = body;

    // Validation
    if (category && !["Aesthetic", "Dental"].includes(category)) {
      return NextResponse.json(
        { error: "Category must be either 'Aesthetic' or 'Dental'" },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(typeof isActive === "boolean" && { isActive }),
        ...(image !== undefined && { image }),
      },
    });

    return NextResponse.json(service);
  } catch (error: any) {
    console.error("Service update error:", error);
    return NextResponse.json(
      {
        error: "Failed to update service",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    console.error("Service delete error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete service",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
