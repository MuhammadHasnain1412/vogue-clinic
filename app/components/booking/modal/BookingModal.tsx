"use client";

import {
  Modal,
  TextInput,
  Select,
  Button,
  Stack,
  Text,
  Paper,
  Grid,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

interface BookingModalProps {
  opened: boolean;
  onClose: () => void;
  selectedService?: string;
}

export const BookingModal = ({
  opened,
  onClose,
  selectedService,
}: BookingModalProps) => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "", // Add this line
      time: "", // Add this line
      message: "",
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Name is required" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value.trim().length < 5 ? "Phone number is required" : null,
      service: (value) => (value ? null : "Please select a service"),
    },
  });

  const mainColor = "#3c4b22";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form.values,
          date: form.values.date || new Date().toISOString().split("T")[0],
          time: form.values.time || "09:00",
        }),
      });

      // First check if the response is JSON
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response");
      }

      if (response.ok) {
        notifications.show({
          title: "Success",
          message: "Your appointment has been booked successfully!",
          color: "green",
        });
        form.reset();
        onClose();
      } else {
        throw new Error(data.error || "Failed to book appointment");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Booking error:", error);
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      overlayProps={{ blur: 8 }}
      title={
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Text fw={700} size="xl">
            Book an Appointment
          </Text>
          <div
            style={{
              height: 4,
              width: 60,
              background: mainColor,
              borderRadius: 6,
            }}
          />
        </div>
      }
      styles={{
        header: { paddingBottom: 0 },
        body: { paddingTop: 8 },
      }}
    >
      <Paper
        shadow="lg"
        radius="lg"
        p="xl"
        withBorder
        style={{
          borderColor: mainColor,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Stack gap="xl">
          <Text size="md" color="dimmed" mb="xs">
            Provide your details and our staff will confirm your appointment.
          </Text>

          {/* Two-column layout */}
          <Grid gutter="lg">
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Your Name"
                placeholder="John Doe"
                size="md"
                radius="md"
                withAsterisk
                {...form.getInputProps("name")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput
                label="Phone Number"
                placeholder="03XX-XXXXXXX"
                size="md"
                radius="md"
                withAsterisk
                {...form.getInputProps("phone")}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <Select
                label="Choose Service"
                placeholder="Select a service"
                size="md"
                radius="md"
                data={[
                  { value: "Aesthetic", label: "Aesthetic Services" },
                  { value: "Dental", label: "Dental Services" },
                ]}
                {...form.getInputProps("service")}
              />
            </Grid.Col>
          </Grid>

          <Divider />

          <Button
            fullWidth
            size="lg"
            radius="md"
            loading={isSubmitting}
            style={{
              background: mainColor,
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
            }}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};
