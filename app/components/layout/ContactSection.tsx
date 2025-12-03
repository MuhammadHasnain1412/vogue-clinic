"use client";

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Box,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Failed to send message",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container id="contact" size="lg" py="xl" style={{ marginTop: 40 }}>
      <Title order={2} ta="center" mb="xl">
        Contact Us
      </Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50}>
        <Box>
          <Title order={3} mb="md">
            Get In Touch
          </Title>
          <Text mb="lg">
            Have questions or want to schedule an appointment? Fill out the form
            and our team will get back to you as soon as possible.
          </Text>
        </Box>

        <Box>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              mb="md"
            />
            <TextInput
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              mb="md"
            />
            <TextInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              mb="md"
            />
            <Textarea
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
              rows={5}
              mb="md"
            />
            {submitStatus && (
              <Text color={submitStatus.success ? "green" : "red"} mb="md">
                {submitStatus.message}
              </Text>
            )}
            <Button
              type="submit"
              color="yellow"
              size="md"
              loading={isSubmitting}
              style={{ backgroundColor: "var(--mantine-color-yellow-6)" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
