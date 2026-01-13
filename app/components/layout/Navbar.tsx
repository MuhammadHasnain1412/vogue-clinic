// In Navbar.tsx
"use client";

import { useState } from "react";
import {
  AppShell,
  Group,
  Button,
  Box,
  Image,
  Burger,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BookingModal } from "../booking/modal";

const mainColor = "#3c4b22"; // Updated to Green

export const Navbar = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    close();
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
          borderBottom: "1px solid #f1f3f5",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          style={{
            width: "100%",
            maxWidth: 1300,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--mantine-spacing-md) var(--mantine-spacing-xl)",
          }}
        >
          <Image
            src="logo.svg"
            height={32}
            width="auto"
            alt="Vogue Logo"
            style={{ maxWidth: 120, objectFit: "contain" }}
          />
          {/* Desktop Navigation */}
          <Group gap={32} visibleFrom="sm">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="subtle"
                size="sm"
                color="dark" // Dark text
                onClick={() => scrollToSection(item.section)}
                style={{
                  minHeight: 44,
                  minWidth: 44,
                  fontSize: 15, // Slightly refined
                  fontWeight: 500,
                  cursor: "pointer",
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
                px: 24,
                fontSize: 15,
                borderRadius: "24px", // Rounded pill
                boxShadow: "0 4px 12px rgba(60, 75, 34, 0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              size="sm"
              onClick={() => setModalOpened(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(60, 75, 34, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(60, 75, 34, 0.2)";
              }}
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
            style={{
              zIndex: 1000,
              minHeight: 44,
              minWidth: 44,
              marginLeft: 24,
            }}
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
                style={{ textAlign: "left" }}
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

      <BookingModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};
