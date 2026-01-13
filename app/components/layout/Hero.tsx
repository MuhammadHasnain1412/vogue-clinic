"use client";

import { Container, Stack, Title, Text, Button, Box, rem } from "@mantine/core";
import { motion } from "framer-motion";
import { Carousel } from "@mantine/carousel";
// @ts-ignore
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface HeroProps {
  onBook?: () => void;
}

export const Hero = ({ onBook }: HeroProps) => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <>
      <Box
        id="hero"
        pos="relative"
        h={{ base: "80vh", md: "90vh" }}
        style={{ overflow: "hidden" }}
      >
        <Carousel
          withIndicators
          height="100%"
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
          style={{ height: "100%" }}
        >
          {/* Slide 1 */}
          <Carousel.Slide>
            <Box pos="relative" w="100%" h="100%">
              <img
                src="/banner1.jpg"
                alt="Modern Facility"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)", // Lighter gradient
                }}
              />
            </Box>
          </Carousel.Slide>

          {/* Slide 2 */}
          <Carousel.Slide>
            <Box pos="relative" w="100%" h="100%">
              <img
                src="/banner2.jpg"
                alt="Professional Team"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)",
                }}
              />
            </Box>
          </Carousel.Slide>

          {/* Slide 3 */}
          <Carousel.Slide>
            <Box pos="relative" w="100%" h="100%">
              <img
                src="/Vogue.png"
                alt="Happy Clients"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)",
                }}
              />
            </Box>
          </Carousel.Slide>
        </Carousel>
      </Box>
    </>
  );
};
