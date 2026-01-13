import { DoctorsSection } from "./components/doctors";
import { Hero, AboutSection, ContactSection } from "./components/layout";
import { ServicesSection } from "./components/services";
import { SERVICES, DOCTORS } from "../lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection services={SERVICES} />
      <AboutSection />
      <DoctorsSection doctors={DOCTORS} />
      <ContactSection />
    </>
  );
}
