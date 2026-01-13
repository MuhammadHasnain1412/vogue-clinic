"use client";

import {
  Container,
  Group,
  Text,
  Stack,
  Anchor,
  Title,
  Divider,
  Box,
} from "@mantine/core";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const mainColor = "#3c4b22";

export const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 48em)");

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: "#f9f9f9",
        borderTop: `1px solid #eee`,
        width: "100%",
        padding: "40px 0",
      }}
    >
      <Container size="xl">
        {/* Main Footer Content */}
        <Group
          align="start"
          justify="space-between"
          style={{
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "2rem" : "4rem",
            marginBottom: "2rem",
          }}
        >
          {/* Clinic Info */}
          <Stack style={{ maxWidth: 300, width: "100%" }}>
            <Title order={4} style={{ color: mainColor, marginBottom: "1rem" }}>
              Vogue Dental Aesthetics
            </Title>
            <Text size="sm" mb="md">
              Premium Cosmetic & Dental Clinic providing exceptional care with
              the latest technology and techniques.
            </Text>
            <Group wrap="nowrap" align="flex-start" gap="sm">
              <IconMapPin
                size={20}
                style={{
                  color: mainColor,
                  flexShrink: 0,
                  marginTop: 3,
                }}
              />
              <Text size="sm" style={{ lineHeight: 1.4 }}>
                Building C43/11, 2nd Floor, Block M3-A, Block M 3 A Lake City,
                Lahore
              </Text>
            </Group>
            <Group>
              <IconPhone
                size={20}
                style={{ color: mainColor, flexShrink: 0 }}
              />
              <Text size="sm">0321-0052424</Text>
            </Group>
            {/* <Group>
              <IconMail size={20} style={{ color: mainColor, flexShrink: 0 }} />
              <Text size="sm">info@voguedental.com</Text>
            </Group> */}
            <Group>
              <IconClock
                size={20}
                style={{ color: mainColor, flexShrink: 0 }}
              />
              <Text size="sm">Mon-Fri: 9:00 AM - 6:00 PM</Text>
            </Group>
          </Stack>

          {/* Map Section */}
          <Box
            style={{
              width: isMobile ? "100%" : "60%",
              height: isMobile ? "300px" : "250px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.6266932919148!2d74.25190687539957!3d31.369279174283463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919abb3ef102279%3A0x4892cb86d174089a!2sVogue%20Dental%20%26%20Aesthetics!5e0!3m2!1sen!2s!4v1764753783619!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vogue Dental Aesthetics Location"
            ></iframe>
          </Box>
        </Group>

        <Divider my="md" />

        {/* Bottom Bar */}
        <Group
          justify="space-between"
          style={{ flexDirection: isMobile ? "column" : "row" }}
        >
          <Text size="sm" ta={isMobile ? "center" : "left"}>
            &copy; {new Date().getFullYear()} Vogue Dental Aesthetics. All
            rights reserved.
          </Text>

          <Group
            gap="md"
            justify={isMobile ? "center" : "flex-end"}
            mt={isMobile ? "md" : 0}
          >
            <Anchor
              href="https://instagram.com"
              target="_blank"
              size="sm"
              style={{ color: "#333" }}
            >
              Instagram
            </Anchor>
            <Anchor
              href="https://facebook.com"
              target="_blank"
              size="sm"
              style={{ color: "#333" }}
            >
              Facebook
            </Anchor>
            <Anchor
              href="/admin/login" // Admin link
              size="sm"
              style={{ color: "#999" }}
            >
              Admin
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};
