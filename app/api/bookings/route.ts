import { BookingConfirmation } from "../../components/email/BookingConfirmation";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, message } = body;

    // Basic validation
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email to admin
    await resend.emails.send({
      from: "Vogue Clinic <noreply@vogueclinic.com>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New Booking: ${service}`,
      react: BookingConfirmation({
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
      }),
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: "Vogue Clinic <noreply@vogueclinic.com>",
      to: email,
      subject: `Your Vogue Clinic Appointment Confirmation`,
      react: BookingConfirmation({
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
      }),
    });

    return NextResponse.json(
      {
        message:
          "Appointment booked successfully! A confirmation has been sent to your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
