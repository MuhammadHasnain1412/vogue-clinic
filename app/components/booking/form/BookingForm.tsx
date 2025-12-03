"use client";

import { Paper, Title, Group, ActionIcon, Box, useMantineTheme, Grid, Fieldset, TextInput, Select, Button } from "@mantine/core";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useBooking } from "../hooks";

const serviceOptions = [
  { value: "cleaning", label: "Teeth Cleaning" },
  { value: "whitening", label: "Teeth Whitening" },
  { value: "aesthetic", label: "Aesthetic Treatment" },
  { value: "consultation", label: "Consultation" },
];

type BookingFormProps = {
  formTitle?: string;
  onClose?: () => void;
};

export const BookingForm = ({
  onClose,
  formTitle = "Book an Appointment",
}: BookingFormProps) => {
  const theme = useMantineTheme();
  const { submitBooking, isLoading } = useBooking();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      date: '',
      time: '',
      service: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      date: (value) => (value ? null : 'Date is required'),
      time: (value) => (value ? null : 'Time is required'),
      service: (value) => (value ? null : 'Service is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const success = await submitBooking(values);
    if (success) {
      form.reset();
      if (onClose) onClose();
    }
  };

  return (
    <Paper shadow="md" radius="md">
      <Box p="md" bg={theme.colors.blue[7]}>
        <Group justify="space-between">
          <Group>
            <IconCalendar size={24} color="white" stroke={1.5} />
            <Title order={3} c="white">
              {formTitle}
            </Title>
          </Group>
          {onClose && (
            <ActionIcon onClick={onClose} variant="transparent" color="white">
              <IconX size={20} />
            </ActionIcon>
          )}
        </Group>
      </Box>

      <Box p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Fieldset legend="Appointment Details">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  required
                  {...form.getInputProps('name')}
                />
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Email"
                  placeholder="email@example.com"
                  required
                  {...form.getInputProps('email')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Preferred Date"
                  type="date"
                  required
                  {...form.getInputProps('date')}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Preferred Time"
                  type="time"
                  required
                  {...form.getInputProps('time')}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  label="Service"
                  placeholder="Select service"
                  data={serviceOptions}
                  required
                  {...form.getInputProps('service')}
                />
              </Grid.Col>
            </Grid>
          </Fieldset>

          <Group justify="flex-end" mt="md">
            <Button 
              type="submit"
              size="md"
              color="gold"
              loading={isLoading}
              leftSection={<IconCalendar size={16} />}
            >
              Book Appointment
            </Button>
          </Group>
        </form>
      </Box>
    </Paper>
  );
};
