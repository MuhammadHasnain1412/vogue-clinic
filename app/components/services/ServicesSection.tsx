"use client";

import { Container, Tabs, SimpleGrid, Text, Title, Stack, Paper, Image } from "@mantine/core";

export interface Service {
  id: number;
  name: string;
  description: string;
  category: "Aesthetic" | "Dental";
  image: string; // Add image path or URL
}

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const aesthetic = services.filter((s) => s.category === "Aesthetic");
  const dental = services.filter((s) => s.category === "Dental");

  const renderServices = (items: Service[]) => (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: 'md', sm: 'xl' }} mt="md">
      {items.map((service) => (
        <Stack key={service.id} align="center" gap="sm">
          {/* Circle image */}
          <Paper
            radius="50%"
            p="md"
            shadow="sm"
            style={{
              width: 120,
              height: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={service.image}
              alt={service.name}
              fit="cover"
              width={100}
              height={100}
            />
          </Paper>

          {/* Service name */}
          <Text ta="center" w="100%">
            {service.name}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  );

  return (
    <Container id="services" size="lg" py="xl">
      <Stack gap="xl" align="center">
        <Title order={2}>Our Services</Title>
        <Text color="dimmed" ta="center" size="lg" style={{ maxWidth: 600 }}>
          Explore premium dental and aesthetic treatments offered at Vogue Clinic.
        </Text>

        <Tabs defaultValue="aesthetic" radius="md">
          <Tabs.List grow>
            <Tabs.Tab value="aesthetic">Aesthetic</Tabs.Tab>
            <Tabs.Tab value="dental">Dental</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="aesthetic">{renderServices(aesthetic)}</Tabs.Panel>
          <Tabs.Panel value="dental">{renderServices(dental)}</Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
