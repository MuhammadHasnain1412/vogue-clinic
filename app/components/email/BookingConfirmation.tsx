// components/email/BookingConfirmation.tsx
import React from 'react';

interface BookingConfirmationProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export function BookingConfirmation({
  name,
  email,
  phone,
  service,
  date,
  time,
  message,
}: BookingConfirmationProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1>New Booking Confirmation</h1>
      <p>Hello {name},</p>
      <p>Thank you for booking an appointment with Vogue Clinic. Here are your appointment details:</p>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        margin: '20px 0' 
      }}>
        <p><strong>Service:</strong> {service}</p>
        {date && date !== "Not specified" && (
          <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        )}
        {time && time !== "Not specified" && (
          <p><strong>Time:</strong> {time}</p>
        )}
      </div>

      <p>If you need to reschedule or have any questions, please contact us at {process.env.ADMIN_EMAIL}.</p>
      
      <p>Best regards,<br/>The Vogue Clinic Team</p>
    </div>
  );
}
