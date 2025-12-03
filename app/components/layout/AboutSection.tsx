"use client";

import { Container, Title, Text, SimpleGrid, rem, Box } from '@mantine/core';
import { IconDental, IconHeartbeat, IconShieldCheck, IconAward } from '@tabler/icons-react';

const features = [
  {
    icon: IconDental,
    title: 'Expert Dentists',
    description: 'Our team of experienced dentists provides top-quality dental care using the latest technology and techniques.'
  },
  {
    icon: IconHeartbeat,
    title: 'Patient Care',
    description: 'We prioritize your comfort and well-being, ensuring a relaxing and stress-free experience at our clinic.'
  },
  {
    icon: IconShieldCheck,
    title: 'Safety First',
    description: 'We maintain the highest standards of hygiene and safety to protect our patients and staff.'
  },
  {
    icon: IconAward,
    title: 'Quality Service',
    description: 'Committed to excellence, we provide exceptional dental and aesthetic services to all our patients.'
  }
];

export function AboutSection() {
  return (
    <Container id="about" size="lg" py="xl">
      <Title order={2} ta="center" mt="sm">
        About Vogue Dental & Aesthetics
      </Title>

      <Text c="dimmed" ta="center" mt="md" mb={40}>
        Welcome to Vogue Dental & Aesthetics, where we combine cutting-edge technology with personalized care to provide exceptional dental and aesthetic services.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} mt={30}>
        <Box>
          <Text mb="md">
            Established with a vision to provide premium dental and aesthetic care, our clinic is equipped with state-of-the-art facilities and staffed by experienced professionals dedicated to your well-being.
          </Text>
          <Text mb="md">
            We believe in a patient-centered approach, ensuring that each treatment is tailored to your unique needs and goals. Your smile is our priority.
          </Text>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={30}>
          {features.map((feature, index) => (
            <Box key={index} p="md" style={{ borderRadius: 8, backgroundColor: 'var(--mantine-color-gray-0)' }}>
              <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <feature.icon style={{ width: rem(24), height: rem(24), color: 'var(--mantine-color-yellow-6)', marginRight: 12 }} />
                <Text fw={700} fz="lg">
                  {feature.title}
                </Text>
              </Box>
              <Text c="dimmed" size="sm">{feature.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}
