"use client";

import {
  Stack,
  Text,
  Paper,
  Box,
  Grid,
  Badge,
  Group,
  SimpleGrid,
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
  ActionIcon,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconSparkles,
  IconDental,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      category: "",
      image: "",
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Name is required" : null),
      description: (value) =>
        value.trim().length < 5 ? "Description is required" : null,
      category: (value) => (value ? null : "Please select a category"),
    },
  });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/services");
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await axios.post("/api/admin/services", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      notifications.show({
        title: "Success",
        message: "Service created successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      close();
      form.reset();
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || "Failed to create service",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      await axios.put(`/api/admin/services/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      notifications.show({
        title: "Success",
        message: "Service updated successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      close();
      form.reset();
      setEditingService(null);
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || "Failed to update service",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      notifications.show({
        title: "Success",
        message: "Service deleted successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || "Failed to delete service",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      await axios.put(`/api/admin/services/${id}`, { isActive: !isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    form.reset();
    open();
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    form.setValues({
      name: service.name,
      description: service.description,
      category: service.category,
      image: service.image || "",
    });
    open();
  };

  const handleSubmit = () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    if (editingService) {
      updateMutation.mutate({
        id: editingService.id,
        data: form.values,
      });
    } else {
      createMutation.mutate(form.values);
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const aestheticServices =
    services?.filter((s) => s.category === "Aesthetic") || [];
  const dentalServices = services?.filter((s) => s.category === "Dental") || [];

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Box>
          <Text size="32px" fw={700} c="#3c4b22" mb="xs">
            Services Management
          </Text>
          <Text size="md" c="dimmed">
            Manage all clinic services and treatments
          </Text>
        </Box>
        <Button
          leftSection={<IconPlus size={18} />}
          style={{ backgroundColor: "#3c4b22" }}
          onClick={handleOpenAdd}
        >
          Add Service
        </Button>
      </Group>

      {isLoading ? (
        <Center py="xl">
          <Loader color="#3c4b22" />
        </Center>
      ) : (
        <>
          {/* Aesthetic Services */}
          <Paper p="xl" radius="lg" shadow="sm">
            <Group mb="lg">
              <IconSparkles size={28} color="#3c4b22" />
              <Box>
                <Text size="xl" fw={600} c="#3c4b22">
                  Aesthetic Services
                </Text>
                <Text size="sm" c="dimmed">
                  {aestheticServices.length} services
                </Text>
              </Box>
            </Group>

            {aestheticServices.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No aesthetic services yet
              </Text>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {aestheticServices.map((service) => (
                  <Paper
                    key={service.id}
                    p="lg"
                    radius="md"
                    withBorder
                    style={{
                      borderColor: service.isActive ? "#e9ecef" : "#dee2e6",
                      opacity: service.isActive ? 1 : 0.6,
                    }}
                  >
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={600} size="md">
                          {service.name}
                        </Text>
                        <Badge
                          color={service.isActive ? "green" : "gray"}
                          variant="light"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: service.id,
                              isActive: service.isActive,
                            })
                          }
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {service.description}
                      </Text>
                      <Group gap="xs" mt="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleOpenEdit(service)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(service.id, service.name)}
                          loading={deleteMutation.isPending}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            )}
          </Paper>

          {/* Dental Services */}
          <Paper p="xl" radius="lg" shadow="sm">
            <Group mb="lg">
              <IconDental size={28} color="#3c4b22" />
              <Box>
                <Text size="xl" fw={600} c="#3c4b22">
                  Dental Services
                </Text>
                <Text size="sm" c="dimmed">
                  {dentalServices.length} services
                </Text>
              </Box>
            </Group>

            {dentalServices.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No dental services yet
              </Text>
            ) : (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {dentalServices.map((service) => (
                  <Paper
                    key={service.id}
                    p="lg"
                    radius="md"
                    withBorder
                    style={{
                      borderColor: service.isActive ? "#e9ecef" : "#dee2e6",
                      opacity: service.isActive ? 1 : 0.6,
                    }}
                  >
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={600} size="md">
                          {service.name}
                        </Text>
                        <Badge
                          color={service.isActive ? "blue" : "gray"}
                          variant="light"
                          size="sm"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            toggleActiveMutation.mutate({
                              id: service.id,
                              isActive: service.isActive,
                            })
                          }
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {service.description}
                      </Text>
                      <Group gap="xs" mt="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleOpenEdit(service)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(service.id, service.name)}
                          loading={deleteMutation.isPending}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            )}
          </Paper>

          {/* Summary Stats */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="lg" radius="md" withBorder>
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Total Services
                  </Text>
                  <Text size="32px" fw={700} c="#3c4b22">
                    {services?.length || 0}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="lg" radius="md" withBorder>
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Aesthetic Services
                  </Text>
                  <Text size="32px" fw={700} c="#6d9b46">
                    {aestheticServices.length}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="lg" radius="md" withBorder>
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Dental Services
                  </Text>
                  <Text size="32px" fw={700} c="#4dabf7">
                    {dentalServices.length}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Paper p="lg" radius="md" withBorder>
                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Active Services
                  </Text>
                  <Text size="32px" fw={700} c="#40c057">
                    {services?.filter((s) => s.isActive).length || 0}
                  </Text>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
          setEditingService(null);
        }}
        title={
          <Text size="xl" fw={600} c="#3c4b22">
            {editingService ? "Edit Service" : "Add New Service"}
          </Text>
        }
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Service Name"
            placeholder="e.g., HYDRA-FACIAL"
            withAsterisk
            {...form.getInputProps("name")}
          />

          <Textarea
            label="Description"
            placeholder="Brief description of the service"
            withAsterisk
            minRows={3}
            {...form.getInputProps("description")}
          />

          <Select
            label="Category"
            placeholder="Select category"
            withAsterisk
            data={[
              { value: "Aesthetic", label: "Aesthetic Services" },
              { value: "Dental", label: "Dental Services" },
            ]}
            {...form.getInputProps("category")}
          />

          <TextInput
            label="Image URL (Optional)"
            placeholder="https://example.com/image.jpg"
            {...form.getInputProps("image")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              variant="subtle"
              onClick={() => {
                close();
                form.reset();
                setEditingService(null);
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#3c4b22" }}
              onClick={handleSubmit}
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingService ? "Update Service" : "Add Service"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
