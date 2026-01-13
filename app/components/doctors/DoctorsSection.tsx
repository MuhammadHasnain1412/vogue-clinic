"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Text,
  Stack,
  Title,
  Center,
  Box,
} from "@mantine/core";
import { Doctor } from "../../../lib/data";

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export const DoctorsSection = ({ doctors }: DoctorsSectionProps) => {
  return (
    <Container py={80}>
      <Stack align="center" gap="xl">
        <Title order={2}>Our Doctors</Title>
        <Text color="dimmed" ta="center" size="lg" style={{ maxWidth: 600 }}>
          Meet our experienced and qualified doctors who provide the best care
          for you.
        </Text>

        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--mantine-spacing-lg)",
          }}
        >
          {doctors.map((doctor) => (
            <Stack
              key={doctor.id}
              align="center"
              pl={2}
              gap="md"
              style={{
                textAlign: "center",
                backdropFilter: "blur(6px)",
                border: "none",
              }}
            >
              <Center>
                <Box
                  className="doctor-image-wrapper"
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    perspective: "1000px",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={220}
                    height={220}
                    radius="50%"
                    className="doctor-image-3d"
                    style={{
                      width: 220,
                      height: 220,
                      minWidth: 220,
                      minHeight: 220,
                      maxWidth: 220,
                      maxHeight: 220,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "none",
                      boxShadow: `
                        0 10px 30px rgba(0, 0, 0, 0.2),
                        0 6px 20px rgba(0, 0, 0, 0.15),
                        0 2px 10px rgba(0, 0, 0, 0.1),
                        inset 0 -2px 10px rgba(0, 0, 0, 0.1)
                      `,
                      backgroundColor: "#5A6F35",
                      transform: "translateZ(20px)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </Box>
              </Center>
              <Stack gap={4} mt="sm">
                <Text size="lg" fw={600} ta="center">
                  {doctor.name}
                </Text>
                <Text color="gold" size="sm" fw={500} ta="center">
                  {doctor.designation}
                </Text>
                <Text color="dimmed" size="sm" ta="center">
                  {doctor.education}
                </Text>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};
