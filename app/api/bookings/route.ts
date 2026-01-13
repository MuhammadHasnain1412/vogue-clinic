import { BookingConfirmation } from "../../components/email/BookingConfirmation";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/db";

// Initialize Resend with API key from environment
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set in environment variables");
    return null;
  }
  return new Resend(apiKey);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, message } = body;

    // Comprehensive validation
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate phone format (Pakistani)
    const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return NextResponse.json(
        { error: "Cannot book appointments in the past" },
        { status: 400 }
      );
    }

    const requestedServices = Array.isArray(service) ? service : [service];
    const serviceString = requestedServices.join(", ");

    // Check availability logic
    // 1. Fetch all bookings for this slot
    const slotBookings = await prisma.booking.findMany({
      where: {
        date: date,
        time: time,
      },
    });

    // 2. Check capacity for each requested service
    const { SERVICES, DEFAULT_SERVICE_CAPACITY } = await import("@/lib/data");

    for (const reqServiceId of requestedServices) {
      const serviceConfig = SERVICES.find((s) => s.id === reqServiceId);
      const maxCapacity = serviceConfig?.capacity || DEFAULT_SERVICE_CAPACITY;

      // Count how many times this specific service is already booked in this slot
      // Note: bookings can have multiple services "S1, S2", so we check if the string includes the ID
      // This is a simple string check. For robustness with IDs like "S1" vs "S11", strictly we should split.
      const currentBookingsCount = slotBookings.filter((b) => {
        const bookedServicesList = b.service.split(", ");
        return bookedServicesList.includes(reqServiceId);
      }).length;

      if (currentBookingsCount >= maxCapacity) {
        return NextResponse.json(
          {
            error: `Service '${
              serviceConfig?.label || reqServiceId
            }' is fully booked for this time slot. Please select another time.`,
          },
          { status: 409 }
        );
      }
    }

    // Save booking to database
    let bookingId;
    try {
      const booking = await prisma.booking.create({
        data: {
          name,
          email,
          phone,
          service: serviceString,
          date: date,
          time: time,
          message: message || null,
        },
      });
      bookingId = booking.id;
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        {
          error: "Failed to save booking to database",
          details:
            process.env.NODE_ENV === "development"
              ? dbError.message
              : undefined,
        },
        { status: 500 }
      );
    }

    // Send emails (non-blocking - booking already saved)
    try {
      const resend = getResend();
      const adminEmail = process.env.ADMIN_EMAIL;
      const resendApiKey = process.env.RESEND_API_KEY;

      console.log("Email sending attempt:", {
        hasResend: !!resend,
        hasApiKey: !!resendApiKey,
        adminEmail,
        clientEmail: email,
      });

      if (!resendApiKey) {
        console.error("RESEND_API_KEY is missing from environment variables");
      }

      if (!adminEmail) {
        console.error("ADMIN_EMAIL is missing from environment variables");
      }

      if (resend && adminEmail) {
        // Note: Resend's test domain only allows sending to account owner's email
        // For production, verify your domain at https://resend.com/domains
        const accountOwnerEmail = "muhammad.hasnain142002@gmail.com"; // Resend account owner email

        const emailHtml = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Confirmation</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <!-- Main Container -->
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header with Gradient -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #3c4b22 0%, #557633 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎉 Booking Confirmed!</h1>
                            <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your appointment at Vogue Clinic</p>
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding: 40px 30px;">
                            
                            <!-- Greeting -->
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                              Dear <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 30px 0; font-size: 16px; color: #666666; line-height: 1.6;">
                              Your appointment has been successfully booked! We look forward to seeing you.
                            </p>

                            <!-- Booking Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 12px; margin-bottom: 30px;">
                              <tr>
                                <td style="padding: 24px;">
                                  <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #3c4b22; font-weight: 600;">📋 Booking Details</h2>
                                  
                                  <!-- Confirmation Number -->
                                  <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 12px;">
                                    <tr>
                                      <td style="font-size: 14px; color: #666666; padding: 8px 0; border-bottom: 1px solid #e9ecef;">Confirmation Number</td>
                                      <td align="right" style="font-size: 14px; color: #3c4b22; font-weight: 600; padding: 8px 0; border-bottom: 1px solid #e9ecef;">VC-${bookingId
                                        .toString()
                                        .padStart(6, "0")}</td>
                                    </tr>
                                    <tr>
                                      <td style="font-size: 14px; color: #666666; padding: 8px 0; border-bottom: 1px solid #e9ecef;">Service</td>
                                      <td align="right" style="font-size: 14px; color: #333333; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #e9ecef;">${service}</td>
                                    </tr>
                                    <tr>
                                      <td style="font-size: 14px; color: #666666; padding: 8px 0; border-bottom: 1px solid #e9ecef;">Date</td>
                                      <td align="right" style="font-size: 14px; color: #333333; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #e9ecef;">${
                                        date || "Not specified"
                                      }</td>
                                    </tr>
                                    <tr>
                                      <td style="font-size: 14px; color: #666666; padding: 8px 0; border-bottom: 1px solid #e9ecef;">Time</td>
                                      <td align="right" style="font-size: 14px; color: #333333; font-weight: 500; padding: 8px 0; border-bottom: 1px solid #e9ecef;">${
                                        time || "Not specified"
                                      }</td>
                                    </tr>
                                    <tr>
                                      <td style="font-size: 14px; color: #666666; padding: 8px 0;">Phone</td>
                                      <td align="right" style="font-size: 14px; color: #333333; font-weight: 500; padding: 8px 0;">${phone}</td>
                                    </tr>
                                  </table>

                                  ${
                                    message
                                      ? `
                                  <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border-radius: 8px; border-left: 3px solid #3c4b22;">
                                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Your Note</p>
                                    <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6;">${message}</p>
                                  </div>
                                  `
                                      : ""
                                  }
                                </td>
                              </tr>
                            </table>

                            <!-- Clinic Info -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 12px; margin-bottom: 30px;">
                              <tr>
                                <td style="padding: 24px;">
                                  <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #3c4b22; font-weight: 600;">📍 Vogue Clinic</h3>
                                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                                    Aesthetic & Dental Care
                                  </p>
                                  <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">
                                    📞 <a href="tel:+923371671167" style="color: #3c4b22; text-decoration: none; font-weight: 500;">+92-337-1671167</a>
                                  </p>
                                </td>
                              </tr>
                            </table>

                            <!-- What's Next -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8f5e9; border-radius: 12px; margin-bottom: 20px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="margin: 0 0 12px 0; font-size: 14px; color: #2e7d32; font-weight: 600;">✨ What's Next?</p>
                                  <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #2e7d32; line-height: 1.8;">
                                    <li>We'll call you within 2 hours to confirm</li>
                                    <li>Please arrive 10 minutes early</li>
                                    <li>Bring a valid ID</li>
                                  </ul>
                                </td>
                              </tr>
                            </table>

                            <!-- Closing -->
                            <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6; text-align: center;">
                              Thank you for choosing Vogue Clinic! 💚
                            </p>

                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; font-size: 12px; color: #999999;">
                              © ${new Date().getFullYear()} Vogue Clinic. All rights reserved.
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `;

        // Send confirmation email to client
        // Using account owner email for testing (Resend limitation)
        try {
          console.log(`Attempting to send email to client: ${email}`);
          const clientResult = await resend.emails.send({
            from: "Vogue Clinic <onboarding@resend.dev>",
            to: accountOwnerEmail,
            subject: `🎉 Booking Confirmed - ${service}`,
            html: emailHtml,
          });
          console.log(
            "Booking notification email sent successfully:",
            clientResult
          );
        } catch (clientEmailError: any) {
          console.error("Failed to send booking email:", {
            message: clientEmailError.message,
            error: clientEmailError,
          });
        }

        // Send email to admin (using same beautiful template)
        try {
          console.log(`Attempting to send admin notification`);
          const adminResult = await resend.emails.send({
            from: "Vogue Clinic <onboarding@resend.dev>",
            to: accountOwnerEmail, // Using account owner email due to Resend test domain limitation
            subject: `Admin Notification: New Booking - ${service}`,
            html: emailHtml,
          });
          console.log(
            "Admin notification email sent successfully:",
            adminResult
          );
        } catch (adminEmailError: any) {
          console.error("Failed to send admin email:", {
            message: adminEmailError.message,
            error: adminEmailError,
          });
        }
      } else {
        console.warn("Resend not configured - skipping email sending", {
          resend: !!resend,
          adminEmail: !!adminEmail,
        });
      }
    } catch (emailError: any) {
      console.error("Email sending error:", {
        message: emailError.message,
        error: emailError,
        stack: emailError.stack,
      });
      // Don't fail the request if email fails - booking is already saved
    }

    // Generate confirmation number
    const confirmationNumber = `VC-${bookingId.toString().padStart(6, "0")}`;

    // Generate WhatsApp confirmation (FREE - no API needed!)
    const {
      createWhatsAppURL,
      generateConfirmationMessage,
      formatWhatsAppNumber,
    } = await import("@/lib/whatsapp");

    const bookingDetails = {
      name,
      phone,
      service,
      date: date || "Not specified",
      time: time || "Not specified",
      confirmationNumber,
    };

    const whatsappMessage = generateConfirmationMessage(bookingDetails);

    // Send automatic WhatsApp via Twilio
    try {
      const { sendWhatsAppMessage } = await import("@/lib/twilio");
      const formattedPhone = formatWhatsAppNumber(phone);
      // Twilio expects E.164, formatWhatsAppNumber returns 923...
      // We prepend + if missing, though sendWhatsAppMessage handles the prefix 'whatsapp:'
      await sendWhatsAppMessage({
        to: `+${formattedPhone}`,
        body: whatsappMessage,
      });
    } catch (error) {
      console.error("Failed to send automatic WhatsApp:", error);
      // We don't block the response here
    }

    // Create WhatsApp URL - customer sends to themselves (backup/manual)
    const whatsappURL = createWhatsAppURL(phone, whatsappMessage);

    return NextResponse.json(
      {
        message:
          "Appointment booked successfully! Check WhatsApp for confirmation.",
        bookingId,
        confirmationNumber,
        appointmentDate: date,
        appointmentTime: time,
        whatsappURL, // URL to send WhatsApp message
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

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
