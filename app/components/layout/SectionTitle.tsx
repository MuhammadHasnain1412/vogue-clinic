"use client";

import { Title, Text, Stack } from "@mantine/core";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
}

export const SectionTitle = ({ title, subtitle, align = "left" }: SectionTitleProps) => {
  return (
    <Stack 
      align={align} 
      mb={{ base: 'md', sm: 'lg', md: 'xl' }}
    >
      <Title 
        order={2}
        ta={align}
        fz={{ base: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' }}
        lh={{ base: 1.3, sm: 1.2 }}
        fw={700}
      >
        {title}
      </Title>
      {subtitle && (
        <Text 
          color="dimmed" 
          ta={align}
          fz={{ base: 'sm', sm: 'md' }}
          lh={{ base: 1.4, sm: 1.5 }}
          maw={{ base: '100%', sm: '80%', md: '70%' }}
        >
          {subtitle}
        </Text>
      )}
    </Stack>
  );
};
