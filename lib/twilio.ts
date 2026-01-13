import twilio from "twilio";

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Format: whatsapp:+14155238886

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

interface SendWhatsAppParams {
  to: string;
  body: string;
  contentSid?: string; // For templates
  contentVariables?: Record<string, string>; // For template variables
}

export async function sendWhatsAppMessage({
  to,
  body,
  contentSid,
  contentVariables,
}: SendWhatsAppParams) {
  if (!client) {
    console.warn("Twilio credentials not found. Message not sent.");
    return { success: false, error: "Missing Credentials" };
  }

  if (!twilioPhoneNumber) {
    console.warn("Twilio phone number not found. Message not sent.");
    return { success: false, error: "Missing Sender Number" };
  }

  // Ensure 'to' number is in whatsapp format
  const formattedTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

  try {
    const messageOptions: any = {
      from: twilioPhoneNumber,
      to: formattedTo,
    };

    // If using a template (recommended for production outside 24h window)
    if (contentSid) {
      messageOptions.contentSid = contentSid;
      messageOptions.contentVariables = contentVariables;
    } else {
      // Standard freeform message (works in Sandbox or within 24h window)
      messageOptions.body = body;
    }

    const message = await client.messages.create(messageOptions);
    console.log(`WhatsApp message sent: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error: any) {
    if (error.code === 21608) {
      console.warn(
        "Twilio: This number is not verified/joined in Sandbox. Ask client to join first."
      );
      return { success: false, error: "Client not joined to Sandbox" };
    }
    if (error.code === 63015) {
      console.warn("Twilio: Channel Sandbox can only send to joined numbers.");
      return {
        success: false,
        error:
          "Sandbox Limitation: Client must send 'join <keyword>' to Twilio number.",
      };
    }
    console.error("Error sending WhatsApp message:", error);
    return { success: false, error: error.message };
  }
}
