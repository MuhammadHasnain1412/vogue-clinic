"use client";

import { useState } from "react";
import { notifications } from "@mantine/notifications";

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
}

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);

  const submitBooking = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/services/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        notifications.show({
          title: "Success!",
          message: "Your appointment has been booked.",
          color: "green",
        });
        return true;
      } else {
        throw new Error("Booking failed");
      }
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to book appointment. Please try again.",
        color: "red",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitBooking, isLoading };
};
