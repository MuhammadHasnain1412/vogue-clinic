"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import { BookingForm } from "./form/BookingForm";
import { BookingModal } from "./modal";


export default function HomePage() {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div>
      <Button 
        onClick={() => setModalOpened(true)} 
        size="lg" 
        color="gold"
      >
        Book Appointment
      </Button>
      
      <BookingModal 
        opened={modalOpened} 
        onClose={() => setModalOpened(false)} 
      />
    </div>
  );
}
