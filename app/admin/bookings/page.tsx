"use client";

import {
  Stack,
  Text,
  Paper,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Select,
  Box,
  Loader,
  Center,
  Modal,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconSearch,
  IconEye,
  IconTrash,
  IconPhone,
  IconMail,
  IconCalendar,
  IconClock,
  IconUser,
} from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { SERVICES } from "../../../lib/data";

import { Booking } from "../../../lib/types";
import { BookingDetailsModal } from "./BookingDetailsModal";

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/bookings");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/admin/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      notifications.show({
        title: "Success",
        message: "Booking deleted successfully",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete booking",
        color: "red",
      });
    },
  });

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.includes(search);
    const matchesService = !serviceFilter || booking.service === serviceFilter;
    return matchesSearch && matchesService;
  });

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    open();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteMutation.mutate(id);
    }
  };

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
    <Stack gap="xl">
      <Box>
        <Text size="32px" fw={700} c="#3c4b22" mb="xs">
          Bookings Management
        </Text>
        <Text size="md" c="dimmed">
          View and manage all appointment bookings
        </Text>
      </Box>

      <Paper p="xl" radius="lg" shadow="sm">
        <Group mb="xl" gap="md">
          <TextInput
            placeholder="Search by name, email, or phone..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by service"
            data={SERVICES.map((s) => s.id)}
            value={serviceFilter}
            onChange={setServiceFilter}
            clearable
            style={{ width: 250 }}
          />
        </Group>

        {isLoading ? (
          <Center py="xl">
            <Loader color="#3c4b22" />
          </Center>
        ) : filteredBookings && filteredBookings.length > 0 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Service</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Contact</Table.Th>
                  <Table.Th>Created</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredBookings.map((booking) => (
                  <Table.Tr key={booking.id}>
                    <Table.Td>
                      <Badge color="#3c4b22" variant="light">
                        #{booking.id}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={500}>{booking.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="blue" variant="light">
                        {booking.service}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {booking.date || "Not specified"}
                        {booking.time && ` at ${booking.time}`}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={4}>
                        <Group gap={4}>
                          <IconPhone size={14} />
                          <Text size="xs">{booking.phone}</Text>
                        </Group>
                        <Group gap={4}>
                          <IconMail size={14} />
                          <Text size="xs">{booking.email}</Text>
                        </Group>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {formatDate(booking.createdAt)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleViewDetails(booking)}
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(booking.id)}
                          loading={deleteMutation.isPending}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          <Center py="xl">
            <Text c="dimmed">No bookings found</Text>
          </Center>
        )}
      </Paper>

      <BookingDetailsModal
        opened={opened}
        onClose={close}
        booking={selectedBooking}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
