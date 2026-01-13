"use client";

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Container,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  IconCalendar,
  IconDashboard,
  IconMail,
  IconStethoscope,
  IconLogout,
} from "@tabler/icons-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // If on login page, render full screen without layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: IconDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: IconCalendar },
    { href: "/admin/contacts", label: "Contacts", icon: IconMail },
    { href: "/admin/services", label: "Services", icon: IconStethoscope },
  ];

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <AppShell
        header={{ height: 70 }}
        navbar={{
          width: 280,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header
          style={{
            borderBottom: "1px solid #e9ecef",
            backgroundColor: "white",
            zIndex: 200,
          }}
        >
          <Group h="100%" px="xl" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                color="#3c4b22"
              />
              <Text size="24px" fw={700} c="#3c4b22">
                Vogue Clinic Admin
              </Text>
            </Group>

            <Group gap="md" visibleFrom="sm">
              <Link href="/" style={{ textDecoration: "none" }}>
                <Text
                  size="sm"
                  c="dimmed"
                  style={{
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#3c4b22")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#868e96")
                  }
                >
                  ← Back to Website
                </Text>
              </Link>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar
          p="md"
          style={{
            backgroundColor: "white",
            borderRight: "1px solid #e9ecef",
            zIndex: 199,
          }}
        >
          <Box>
            <Text size="xs" c="dimmed" mb="md" tt="uppercase" fw={700} px="sm">
              Navigation
            </Text>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<item.icon size={20} stroke={1.5} />}
                active={pathname === item.href}
                style={{
                  borderRadius: "8px",
                  marginBottom: "6px",
                  fontWeight: 500,
                  backgroundColor:
                    pathname === item.href ? "#3c4b22" : "transparent",
                  color: pathname === item.href ? "white" : "inherit",
                }}
                styles={{
                  root: {
                    "&:hover": {
                      backgroundColor:
                        pathname === item.href ? "#557633" : "#f8f9fa",
                    },
                  },
                }}
              />
            ))}
          </Box>

          <Box
            style={{
              marginTop: "auto",
              paddingTop: "20px",
              borderTop: "1px solid #e9ecef",
            }}
          >
            <NavLink
              label="Logout"
              leftSection={<IconLogout size={20} stroke={1.5} />}
              onClick={handleLogout}
              style={{
                borderRadius: "8px",
                color: "#868e96",
                cursor: "pointer",
              }}
              styles={{
                root: {
                  "&:hover": {
                    backgroundColor: "#fff5f5",
                    color: "#fa5252",
                  },
                },
              }}
            />
          </Box>
        </AppShell.Navbar>

        <AppShell.Main
          style={{
            backgroundColor: "#f8f9fa",
            minHeight: "calc(100vh - 70px)",
            paddingTop: "94px", // 70px header + 24px spacing
            paddingBottom: "40px",
          }}
        >
          <Container size="xl" px="md">
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </Box>
  );
}
