"use client";

import {
  Modal,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  Stack,
  Text,
  Paper,
  Grid,
  Divider,
  Group,
  Box,
  Alert,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  IconShieldCheck,
  IconClock,
  IconCheck,
  IconInfoCircle,
} from "@tabler/icons-react";
import { groupedServices, TIME_SLOTS } from "../../../../lib/data";

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
      service: selectedService ? [selectedService] : [],
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: {
      service: (value) =>
        value.length > 0 ? null : "Please select at least one service",
      date: (value) => {
        if (!value) return "Please select a date";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today ? null : "Cannot book past dates";
      },
      time: (value) => (value ? null : "Please select a time"),
      name: (value) => (value.trim().length < 2 ? "Name is required" : null),
      email: (value) => {
        if (!value || value.trim().length === 0) return "Email is required";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Invalid email address";
      },
      phone: (value) => {
        if (!value || value.trim().length === 0) return "Phone is required";
        const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
        return phoneRegex.test(value.replace(/[-\s]/g, ""))
          ? null
          : "Please enter a valid Pakistani mobile number (e.g., 0300-1234567)";
      },
    },
  });

  const mainColor = "#3c4b22";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);

  const handleSubmit = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.values),
      });

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
        const confirmationNumber =
          data.confirmationNumber || `VC-${data.bookingId}`;

        setConfirmationData({
          confirmationNumber,
          date: form.values.date,
          time: form.values.time,
          service: form.values.service.join(", "),
          email: form.values.email,
          phone: form.values.phone,
        });
        setShowConfirmation(true);
        form.reset();

        // WhatsApp message is now sent automatically via Twilio from the server.
        // No need to open the window manually.
      } else {
        throw new Error(data.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      notifications.show({
        title: "Booking Failed",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again or call us.",
        color: "red",
        icon: <IconInfoCircle />,
        autoClose: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyConfirmationNumber = () => {
    if (confirmationData?.confirmationNumber) {
      navigator.clipboard.writeText(confirmationData.confirmationNumber);
      notifications.show({
        title: "Copied!",
        message: "Confirmation number copied to clipboard",
        color: "green",
        icon: <IconCheck />,
        autoClose: 2000,
      });
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationData(null);
    onClose();
  };

  return (
    <>
      {/* Main Booking Modal */}
      <Modal
        opened={opened && !showConfirmation}
        onClose={onClose}
        centered
        size="lg"
        radius="lg"
        scrollAreaComponent={ScrollArea.Autosize}
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
          p="md" // Reduced padding from xl
          withBorder
          style={{
            borderColor: mainColor,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Stack gap="sm">
            {" "}
            {/* Reduced gap from xl */}
            {/* Trust Signals - Single Row */}
            <Group
              gap="md"
              wrap="nowrap"
              justify="center"
              style={{ opacity: 0.8 }}
            >
              <Group gap={4}>
                <IconShieldCheck size={16} color="green" />
                <Text size="xs" c="dimmed">
                  Secure & Confidential
                </Text>
              </Group>
              <Group gap={4}>
                <IconClock size={16} color="#3c4b22" />
                <Text size="xs" c="dimmed">
                  2hr Call-back
                </Text>
              </Group>
            </Group>
            <Divider />
            {/* Section 1: Choose Service */}
            <Box>
              <Text size="md" fw={600} mb="xs" c={mainColor}>
                1. Service
              </Text>
              <MultiSelect
                placeholder="Select services"
                size="sm"
                radius="md"
                withAsterisk
                searchable
                data={groupedServices}
                hidePickedOptions
                {...form.getInputProps("service")}
              />
            </Box>
            {/* Section 2: Pick Date & Time */}
            <Box>
              <Text size="md" fw={600} mb="xs" c={mainColor} mt="xs">
                2. Date & Time
              </Text>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <TextInput
                    placeholder="Preferred Date"
                    type="date"
                    size="sm"
                    radius="md"
                    withAsterisk
                    min={new Date().toISOString().split("T")[0]}
                    {...form.getInputProps("date")}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Time"
                    size="sm"
                    radius="md"
                    withAsterisk
                    data={TIME_SLOTS}
                    {...form.getInputProps("time")}
                  />
                </Grid.Col>
              </Grid>
            </Box>
            {/* Section 3: Details */}
            <Box>
              <Text size="md" fw={600} mb="xs" c={mainColor} mt="xs">
                3. Your Details
              </Text>
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    placeholder="Name"
                    size="sm"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("name")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    placeholder="Phone 0300..."
                    size="sm"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("phone")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <TextInput
                    placeholder="Email"
                    type="email"
                    size="sm"
                    radius="md"
                    withAsterisk
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Textarea
                    placeholder="Additional Notes (Optional)..."
                    size="sm"
                    radius="md"
                    minRows={2}
                    autosize
                    maxRows={4}
                    {...form.getInputProps("message")}
                  />
                </Grid.Col>
              </Grid>
            </Box>
            <Group justify="flex-end" mt="xs">
              <Button
                variant="subtle"
                onClick={onClose}
                disabled={isSubmitting}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                size="md"
                radius="md"
                loading={isSubmitting}
                leftSection={<IconCheck size={16} />}
                style={{
                  background: mainColor,
                  color: "white",
                  fontWeight: 600,
                }}
                onClick={handleSubmit}
              >
                {isSubmitting ? "..." : "Confirm"}
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        opened={showConfirmation}
        onClose={handleCloseConfirmation}
        centered
        size="md"
        radius="lg"
        withCloseButton={false}
        overlayProps={{ blur: 8 }}
      >
        <Stack gap="lg" p="md">
          <div style={{ textAlign: "center" }}>
            <Text size="48px">🎉</Text>
            <Text size="xl" fw={700} c={mainColor} mt="sm">
              Booking Confirmed!
            </Text>
          </div>

          <Paper p="lg" bg="green.0" radius="md">
            <Stack gap="sm">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Confirmation Number:
                </Text>
                <Text size="lg" fw={700} c={mainColor}>
                  {confirmationData?.confirmationNumber}
                </Text>
              </Group>
              <Button
                variant="light"
                color="green"
                fullWidth
                onClick={copyConfirmationNumber}
                leftSection={<IconCheck size={16} />}
              >
                Copy Confirmation Number
              </Button>
            </Stack>
          </Paper>

          <Stack gap="xs">
            <Group gap="xs">
              <IconCheck size={18} color="green" />
              <Text size="sm">
                <strong>Service:</strong> {confirmationData?.service}
              </Text>
            </Group>
            <Group gap="xs">
              <IconCheck size={18} color="green" />
              <Text size="sm">
                <strong>Date:</strong> {confirmationData?.date}
              </Text>
            </Group>
            <Group gap="xs">
              <IconCheck size={18} color="green" />
              <Text size="sm">
                <strong>Time:</strong> {confirmationData?.time}
              </Text>
            </Group>
          </Stack>

          <Alert icon={<IconClock size={16} />} color="blue" variant="light">
            <Text size="sm">
              <strong>What's Next?</strong>
              <br />• Confirmation email sent to {confirmationData?.email}
              <br />• We'll call you at {confirmationData?.phone} within 2 hours
              <br />• Please save your confirmation number
            </Text>
          </Alert>

          <Button
            fullWidth
            size="lg"
            style={{ background: mainColor }}
            onClick={handleCloseConfirmation}
          >
            Done
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
