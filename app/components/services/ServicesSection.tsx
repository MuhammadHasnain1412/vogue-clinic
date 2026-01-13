"use client";

import {
  Container,
  Tabs,
  SimpleGrid,
  Text,
  Title,
  Stack,
  Paper,
  Image,
} from "@mantine/core";

import { Service } from "../../../lib/data";

interface ServicesSectionProps {
  services: Service[];
}

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const aesthetic = services.filter((s) => s.category === "Aesthetic");
  const dental = services.filter((s) => s.category === "Dental");

  const renderServices = (items: Service[]) => (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
      spacing={{ base: "md", sm: "xl" }}
      mt="md"
    >
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"; // Default shadow
            }}
          >
            <Image
              src={service.image}
              alt={service.label}
              fit="cover"
              width={100}
              height={100}
            />
          </Paper>

          {/* Service name */}
          <Text ta="center" w="100%">
            {service.label}
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
          Explore premium dental and aesthetic treatments offered at Vogue
          Clinic.
        </Text>

        <Tabs defaultValue="aesthetic" radius="md" color="lime" variant="pills">
          <Tabs.List grow>
            <Tabs.Tab
              value="aesthetic"
              style={{ fontSize: "1.1rem", fontWeight: 600 }}
            >
              Aesthetic
            </Tabs.Tab>
            <Tabs.Tab
              value="dental"
              style={{ fontSize: "1.1rem", fontWeight: 600 }}
            >
              Dental
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="aesthetic">{renderServices(aesthetic)}</Tabs.Panel>
          <Tabs.Panel value="dental">{renderServices(dental)}</Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
