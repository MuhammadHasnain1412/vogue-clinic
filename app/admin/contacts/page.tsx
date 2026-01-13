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
  IconUser,
  IconMessage,
} from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/contacts");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      notifications.show({
        title: "Success",
        message: "Contact deleted successfully",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete contact",
        color: "red",
      });
    },
  });

  const filteredContacts = contacts?.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      (contact.phone && contact.phone.includes(search))
    );
  });

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    open();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this contact?")) {
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
          Contact Messages
        </Text>
        <Text size="md" c="dimmed">
          View and manage all contact form submissions
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
        </Group>

        {isLoading ? (
          <Center py="xl">
            <Loader color="#3c4b22" />
          </Center>
        ) : filteredContacts && filteredContacts.length > 0 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Contact Info</Table.Th>
                  <Table.Th>Message Preview</Table.Th>
                  <Table.Th>Created</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredContacts.map((contact) => (
                  <Table.Tr key={contact.id}>
                    <Table.Td>
                      <Badge color="#3c4b22" variant="light">
                        #{contact.id}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={500}>{contact.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={4}>
                        <Group gap={4}>
                          <IconMail size={14} />
                          <Text size="xs">{contact.email}</Text>
                        </Group>
                        {contact.phone && (
                          <Group gap={4}>
                            <IconPhone size={14} />
                            <Text size="xs">{contact.phone}</Text>
                          </Group>
                        )}
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" lineClamp={2} c="dimmed">
                        {contact.message}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {formatDate(contact.createdAt)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleViewDetails(contact)}
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(contact.id)}
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
            <Text c="dimmed">No contacts found</Text>
          </Center>
        )}
      </Paper>

      {/* Modern Minimal Contact Details Modal */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="lg"
        radius="lg"
        withCloseButton={false}
        padding="0"
        styles={{
          body: { padding: 0 },
        }}
      >
        {selectedContact && (
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
                    Contact Details
                  </Text>
                  <Text size="sm" c="rgba(255,255,255,0.8)">
                    Message from website visitor
                  </Text>
                </Box>
                <Badge size="xl" color="white" variant="filled" c="#3c4b22">
                  #{selectedContact.id}
                </Badge>
              </Group>
            </Box>

            <Stack gap="md" p="lg">
              {/* Contact Information */}
              <Box>
                <Group mb="md">
                  <IconUser size={20} color="#3c4b22" />
                  <Text size="lg" fw={600} c="#3c4b22">
                    Contact Information
                  </Text>
                </Group>
                <Paper p="md" radius="md" bg="#f8f9fa">
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Full Name
                      </Text>
                      <Text size="sm" fw={600}>
                        {selectedContact.name}
                      </Text>
                    </Group>
                    <Divider />
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Email Address
                      </Text>
                      <Group gap={6}>
                        <IconMail size={14} color="#3c4b22" />
                        <Text size="sm" fw={500}>
                          {selectedContact.email}
                        </Text>
                      </Group>
                    </Group>
                    {selectedContact.phone && (
                      <>
                        <Divider />
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">
                            Phone Number
                          </Text>
                          <Group gap={6}>
                            <IconPhone size={14} color="#3c4b22" />
                            <Text size="sm" fw={500}>
                              {selectedContact.phone}
                            </Text>
                          </Group>
                        </Group>
                      </>
                    )}
                    <Divider />
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">
                        Submitted On
                      </Text>
                      <Text size="sm" fw={500} c="dimmed">
                        {formatDate(selectedContact.createdAt)}
                      </Text>
                    </Group>
                  </Stack>
                </Paper>
              </Box>

              {/* Message */}
              <Box>
                <Group mb="md">
                  <IconMessage size={20} color="#3c4b22" />
                  <Text size="lg" fw={600} c="#3c4b22">
                    Message
                  </Text>
                </Group>
                <Paper
                  p="md"
                  radius="md"
                  withBorder
                  style={{ borderColor: "#e9ecef" }}
                >
                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
                    {selectedContact.message}
                  </Text>
                </Paper>
              </Box>

              {/* Actions */}
              <Group
                justify="space-between"
                mt="md"
                pt="md"
                style={{ borderTop: "1px solid #e9ecef" }}
              >
                <Button variant="subtle" color="gray" onClick={close}>
                  Close
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => {
                    close();
                    handleDelete(selectedContact.id);
                  }}
                >
                  Delete Contact
                </Button>
              </Group>
            </Stack>
          </Box>
        )}
      </Modal>
    </Stack>
  );
}
