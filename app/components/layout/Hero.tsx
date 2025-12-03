"use client";

import { Container, Stack, Title, Text, Button, Box, rem } from "@mantine/core";
import { motion } from "framer-motion";
import { Carousel } from "@mantine/carousel";
// @ts-ignore
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { BookingModal } from "../booking/modal";

interface HeroProps {
  onBook?: () => void;
}

export const Hero = ({ onBook }: HeroProps) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [modalOpened, setModalOpened] = useState(false);

  const handleBookClick = () => {
    if (onBook) {
      onBook();
    }
    setModalOpened(true);
  };

  return (
    <>
      <Box
        id="hero"
        mih={{ base: "55dvh", sm: "65vh", md: "80vh", lg: "85vh" }}
        display="flex"
        pos="relative"
        style={{
          alignItems: "center",
          paddingTop: "var(--mantine-spacing-xl)",
          paddingBottom: "var(--mantine-spacing-xl)",
          overflow: "hidden",
          // background: "linear-gradient(135deg, #fff9e6 0%, #ffd01a 100%)",
        }}
      >
        <Carousel
          withIndicators
          height="100%"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            // filter: "blur(2px)",
          }}
          slideGap="md"
        >
          <Carousel.Slide>
            <img
              src="/banner1.jpg"
              alt="Modern Facility"
              style={{
                objectFit: "fill",
                borderRadius: 0,
              }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="/banner2.jpg"
              alt="Professional Team"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 0,
                display: "block",
              }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="/Vogue.png"
              alt="Happy Clients"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 0,
                display: "block",
                position: "absolute",
              }}
            />
          </Carousel.Slide>
        </Carousel>
        {/* HERO CONTENT */}
        {/* <Container
          size="lg"
          px={{ base: "xs", sm: "md", lg: "xl" }}
          style={{ zIndex: 3 }}
        >
          <Stack align="center" maw="100%" gap="xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%" }}
            >
              <Title
                order={1}
                ta="center"
                maw={{ base: "95vw", sm: 800 }}
                fz={{
                  base: "1.5rem",
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                }}
                lh={{
                  base: 1.3,
                  sm: 1.25,
                  md: 1.2,
                  lg: 1.1,
                }}
                fw={700}
                mx="auto"
                px={{ base: "xs", sm: "md" }}
                style={{ opacity: 0.9 }}
              >
                Premium Dental & Aesthetic Care
              </Title>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ width: "100%" }}
            >
              <Text
                ta="center"
                fz={{
                  base: "0.98rem",
                  sm: "md",
                  md: "lg",
                }}
                lh={{ base: 1.5, sm: 1.6 }}
                maw={{ base: "95vw", sm: 650 }}
                mx="auto"
                px={{ base: "xs", sm: "md", lg: "xl" }}
                c="dimmed"
                fw={500}
                style={{ opacity: 0.85 }}
              >
                Experience professional treatments in a relaxing and modern
                environment. Your smile deserves the best!
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ width: "100%" }}
            >
              <Button
                color="#5A6F35"
                radius="xl"
                onClick={handleBookClick}
                px={{ base: 20, sm: 30, md: 35 }}
                fw={600}
                fullWidth
                style={{
                  fontSize: rem(16),
                  minHeight: 44,
                  transition: "all 0.3s ease",
                  maxWidth: 320,
                  marginInline: "auto",
                  backgroundColor: "#5A6F35",
                }}
                variant="filled"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3c4b22";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#5A6F35";
                }}
              >
                Book Appointment
              </Button>
            </motion.div>
          </Stack>
        </Container> */}
      </Box>
      {/* 
      <BookingModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      /> */}
    </>
  );
};
