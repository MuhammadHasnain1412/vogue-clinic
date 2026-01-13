"use client";

import {
  Modal,
  Box,
  Group,
  Text,
  Badge,
  Stack,
  Paper,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconUser,
  IconPhone,
  IconMail,
  IconCalendar,
  IconClock,
  IconTrash,
} from "@tabler/icons-react";
import { Booking } from "../../../lib/types";

interface BookingDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  booking: Booking | null;
  onDelete: (id: number) => void;
}

export const BookingDetailsModal = ({
  opened,
  onClose,
  booking,
  onDelete,
}: BookingDetailsModalProps) => {
  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      withCloseButton={false}
      padding="0"
      styles={{
        body: { padding: 0 },
      }}
    >
      <Box>
        {/* Header with gradient */}
        <Box
          p="lg"
          style={{
            background: "linear-gradient(135deg, #3c4b22 0%, #557633 100%)",
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Group justify="space-between" align="flex-start">
            <Box>
              <Text size="24px" fw={700} c="white" mb="xs">
                Booking Details
              </Text>
              <Text size="sm" c="rgba(255,255,255,0.8)">
                Complete appointment information
              </Text>
            </Box>
            <Badge size="xl" color="white" variant="filled" c="#3c4b22">
              #{booking.id}
            </Badge>
          </Group>
        </Box>

        <Stack gap="md" p="lg">
          {/* Patient Information */}
          <Box>
            <Group mb="md">
              <IconUser size={20} color="#3c4b22" />
              <Text size="lg" fw={600} c="#3c4b22">
                Patient Information
              </Text>
            </Group>
            <Paper p="md" radius="md" bg="#f8f9fa">
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Full Name
                  </Text>
                  <Text size="sm" fw={600}>
                    {booking.name}
                  </Text>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Phone Number
                  </Text>
                  <Group gap={6}>
                    <IconPhone size={14} color="#3c4b22" />
                    <Text size="sm" fw={500}>
                      {booking.phone}
                    </Text>
                  </Group>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Email Address
                  </Text>
                  <Group gap={6}>
                    <IconMail size={14} color="#3c4b22" />
                    <Text size="sm" fw={500}>
                      {booking.email}
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Paper>
          </Box>

          {/* Appointment Details */}
          <Box>
            <Group mb="md">
              <IconCalendar size={20} color="#3c4b22" />
              <Text size="lg" fw={600} c="#3c4b22">
                Appointment Details
              </Text>
            </Group>
            <Paper p="md" radius="md" bg="#f8f9fa">
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Text size="sm" c="dimmed" mt={4}>
                    Service
                  </Text>
                  <Group gap={4} justify="flex-end" style={{ maxWidth: "60%" }}>
                    {booking.service.split(",").map((s, index) => (
                      <Badge key={index} color="blue" variant="light" size="md">
                        {s.trim()}
                      </Badge>
                    ))}
                  </Group>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Appointment Date
                  </Text>
                  <Group gap={6}>
                    <IconCalendar size={14} color="#3c4b22" />
                    <Text size="sm" fw={600}>
                      {booking.date || "Not specified"}
                    </Text>
                  </Group>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Appointment Time
                  </Text>
                  <Group gap={6}>
                    <IconClock size={14} color="#3c4b22" />
                    <Text size="sm" fw={600}>
                      {booking.time || "Not specified"}
                    </Text>
                  </Group>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Booked On
                  </Text>
                  <Text size="sm" fw={500} c="dimmed">
                    {formatDate(booking.createdAt)}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Box>

          {/* Additional Notes */}
          {booking.message && (
            <Box>
              <Text size="sm" fw={600} mb="xs" c="#3c4b22">
                Additional Notes
              </Text>
              <Paper
                p="md"
                radius="md"
                withBorder
                style={{ borderColor: "#e9ecef" }}
              >
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
                  {booking.message}
                </Text>
              </Paper>
            </Box>
          )}

          {/* Actions */}
          <Group
            justify="space-between"
            mt="md"
            pt="md"
            style={{ borderTop: "1px solid #e9ecef" }}
          >
            <Button variant="subtle" color="gray" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="filled"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={() => {
                onClose();
                onDelete(booking.id);
              }}
            >
              Delete Booking
            </Button>
          </Group>
        </Stack>
      </Box>
    </Modal>
  );
};
