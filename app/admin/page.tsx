"use client";

import {
  Grid,
  Paper,
  Text,
  Group,
  Stack,
  ThemeIcon,
  Box,
  Button,
} from "@mantine/core";
import {
  IconCalendar,
  IconMail,
  IconUsers,
  IconTrendingUp,
  IconArrowRight,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Stats {
  totalBookings: number;
  todayBookings: number;
  totalContacts: number;
  pendingBookings: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/stats");
      return response.data;
    },
  });

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: IconCalendar,
      color: "#3c4b22",
      gradient: "linear-gradient(135deg, #3c4b22 0%, #6d9b46 100%)",
      link: "/admin/bookings",
    },
    {
      title: "Today's Bookings",
      value: stats?.todayBookings || 0,
      icon: IconTrendingUp,
      color: "#ffd01a",
      gradient: "linear-gradient(135deg, #ffd01a 0%, #e6b700 100%)",
      link: "/admin/bookings",
    },
    {
      title: "Total Contacts",
      value: stats?.totalContacts || 0,
      icon: IconMail,
      color: "#6d9b46",
      gradient: "linear-gradient(135deg, #6d9b46 0%, #9ccf73 100%)",
      link: "/admin/contacts",
    },
    {
      title: "Pending Bookings",
      value: stats?.pendingBookings || 0,
      icon: IconUsers,
      color: "#e6b700",
      gradient: "linear-gradient(135deg, #e6b700 0%, #ffd01a 100%)",
      link: "/admin/bookings",
    },
  ];

  return (
    <Stack gap="xl">
      <Box>
        <Text size="32px" fw={700} c="#3c4b22" mb="xs">
          Dashboard
        </Text>
        <Text size="md" c="dimmed">
          Welcome to Vogue Clinic Admin Panel
        </Text>
      </Box>

      <Grid>
        {statCards.map((stat) => (
          <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 3 }}>
            <Paper
              p="xl"
              radius="lg"
              onClick={() => router.push(stat.link)}
              style={{
                background: stat.gradient,
                border: "none",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0, 0, 0, 0.08)";
              }}
            >
              <Group justify="space-between">
                <Stack gap="xs">
                  <Text size="sm" c="white" opacity={0.9} fw={500}>
                    {stat.title}
                  </Text>
                  <Text size="32px" fw={700} c="white">
                    {isLoading ? "..." : stat.value}
                  </Text>
                </Stack>
                <ThemeIcon
                  size={60}
                  radius="md"
                  variant="white"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <stat.icon size={32} color="white" stroke={1.5} />
                </ThemeIcon>
              </Group>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="xl" radius="lg" shadow="sm">
            <Text size="xl" fw={600} mb="md" c="#3c4b22">
              Recent Activity
            </Text>
            <Text c="dimmed">
              Recent bookings and contacts will appear here
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="xl" radius="lg" shadow="sm">
            <Text size="xl" fw={600} mb="md" c="#3c4b22">
              Quick Actions
            </Text>
            <Stack gap="md">
              <Button
                component={Link}
                href="/admin/bookings"
                variant="light"
                color="lime"
                fullWidth
                justify="space-between"
                rightSection={<IconArrowRight size={16} />}
                h={50}
              >
                View all bookings
              </Button>
              <Button
                component={Link}
                href="/admin/services"
                variant="light"
                color="lime"
                fullWidth
                justify="space-between"
                rightSection={<IconArrowRight size={16} />}
                h={50}
              >
                Manage services
              </Button>
              <Button
                component={Link}
                href="/admin/contacts"
                variant="light"
                color="lime"
                fullWidth
                justify="space-between"
                rightSection={<IconArrowRight size={16} />}
                h={50}
              >
                Check contacts
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
