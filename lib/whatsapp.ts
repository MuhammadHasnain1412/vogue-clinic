// Simple WhatsApp integration - 100% FREE, no API needed
// Customer sends message to themselves automatically

interface BookingDetails {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  confirmationNumber: string;
}

/**
 * Format phone number to international format
 */
export function formatWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)]/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = `92${cleaned.substring(1)}`;
  }

  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
}

/**
 * Generate confirmation message
 */
export function generateConfirmationMessage(booking: BookingDetails): string {
  return `🎉 *Booking Confirmed - Vogue Clinic*

Dear ${booking.name},

Your appointment has been successfully booked!

📋 *Booking Details:*
• Confirmation #: ${booking.confirmationNumber}
• Service: ${booking.service}
• Date: ${booking.date}
• Time: ${booking.time}

📍 *Vogue Clinic*
Aesthetic & Dental Care

📞 Questions? Call us at: +92-337-1671167

✨ We look forward to seeing you!

Thank you for choosing Vogue Clinic! 💚`;
}

/**
 * Create WhatsApp URL - Opens WhatsApp with pre-filled message
 * Customer sends to themselves (saved in their chat)
 */
export function createWhatsAppURL(phone: string, message: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message);

  // wa.me link - opens WhatsApp
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Create "Send to Me" URL - Customer sends message to their own number
 * This saves the confirmation in their WhatsApp
 */
export function createSendToMeURL(phone: string, message: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message);

  // This opens a chat with their own number
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Generate admin notification
 */
export function generateAdminNotification(booking: BookingDetails): string {
  return `🔔 *New Booking Alert*

*Patient:* ${booking.name}
*Phone:* ${booking.phone}
*Service:* ${booking.service}
*Date:* ${booking.date}
*Time:* ${booking.time}
*Confirmation:* ${booking.confirmationNumber}

Please confirm this appointment.`;
}

/**
 * Create admin notification URL
 */
export function createAdminNotificationURL(
  booking: BookingDetails,
  adminPhone: string
): string {
  const message = generateAdminNotification(booking);
  return createWhatsAppURL(adminPhone, message);
}
