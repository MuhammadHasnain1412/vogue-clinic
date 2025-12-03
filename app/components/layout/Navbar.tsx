// In Navbar.tsx
"use client";

import { useState } from "react";
import { AppShell, Group, Button, Box, Image, Burger, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BookingModal } from "../booking/modal";

const mainColor = "#D4AF37";

export const Navbar = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toggle(); // Close mobile menu after clicking a link
  };

  const navItems = [
    { label: "Home", section: "hero" },
    { label: "Services", section: "services" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <>
      <AppShell.Header
        style={{
          borderBottom: "1px solid #eee",
          background: "white",
        }}
      >
        <Box style={{ width: '100%', maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--mantine-spacing-md) var(--mantine-spacing-xl)' }}>
          <Image
            src="logo.svg"
            w={{ base: 96, xs: 120, sm: 150, md: 200, lg: 240, xl: 280 }}
            height="auto"
            alt="Vogue Logo"
            style={{ maxHeight: 120, minHeight: 44, minWidth: 72, maxWidth: 280, objectFit: 'contain', marginBottom: 0 }}
            mb={{ lg: 4, xl: 8 }}
          />
          {/* Desktop Navigation */}
          <Group gap={32} visibleFrom="sm">
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                variant="subtle" 
                size="sm" 
                onClick={() => scrollToSection(item.section)}
                style={{ 
                  minHeight: 44, 
                  minWidth: 44, 
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              style={{
                backgroundColor: mainColor,
                color: "white",
                fontWeight: 600,
                minHeight: 44,
                minWidth: 44,
                fontSize: 16,
              }}
              size="sm"
              onClick={() => setModalOpened(true)}
            >
              Book Now
            </Button>
          </Group>
          {/* Mobile menu button remains at the end */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="md"
            hiddenFrom="sm"
            style={{ zIndex: 1000, minHeight: 44, minWidth: 44, marginLeft: 24 }}
          />
        </Box>
        {/* Mobile Navigation Drawer */}
        <Drawer
          opened={opened}
          onClose={toggle}
          position="right"
          size="100%"
          padding="md"
          title="Menu"
          zIndex={999}
          hiddenFrom="sm"
        >
          <Stack gap="md" p="md">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="subtle"
                fullWidth
                onClick={() => scrollToSection(item.section)}
                style={{ textAlign: 'left' }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              fullWidth
              style={{
                backgroundColor: mainColor,
                color: "white",
                fontWeight: 600,
              }}
              onClick={() => {
                setModalOpened(true);
                toggle();
              }}
            >
              Book Now
            </Button>
          </Stack>
        </Drawer>
      </AppShell.Header>

      <BookingModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </>
  );
};
