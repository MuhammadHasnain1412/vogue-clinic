import { Doctor, DoctorsSection } from "./components/doctors";
import { Hero } from "./components/layout";
import { AboutSection } from "./components/layout/AboutSection";
import { ContactSection } from "./components/layout/ContactSection";
import { Service, ServicesSection } from "./components/services";

const services: Service[] = [
  {
    id: 1,
    name: "HYDRA-FACIAL",
    description: "Deep cleansing facial",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 2,
    name: "CARBON PEEL",
    description: "Carbon laser peel for glowing skin",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 3,
    name: "OXYGENO",
    description: "Oxygen facial treatment",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 4,
    name: "PICO LASER",
    description: "Skin rejuvenation with PICO laser",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 5,
    name: "MICRO NEEDLING",
    description: "Collagen induction therapy",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 6,
    name: "HAIR & FACE PRP",
    description: "PRP therapy for hair and face",
    category: "Aesthetic",
    image: "hf.png",
  },
  {
    id: 7,
    name: "Dental consultation",
    description: "Personalized dental check-up",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 8,
    name: "Dental surgeries",
    description: "Safe and effective dental surgeries",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 9,
    name: "Teeth whitening",
    description: "Professional teeth whitening",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 10,
    name: "Scaling & Polishing",
    description: "Remove plaque and stains",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 11,
    name: "Full mouth dentures",
    description: "Custom dentures for your smile",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 12,
    name: "Dental fillings",
    description: "Cavity fillings with precision",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 13,
    name: "Dental X-ray",
    description: "Digital dental X-rays",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 14,
    name: "Veneers",
    description: "Cosmetic veneers for perfect teeth",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 15,
    name: "Root canals",
    description: "Pain-free root canal treatment",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 16,
    name: "Crowns & bridges",
    description: "Restore damaged teeth",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 17,
    name: "Dental implants",
    description: "Replace missing teeth with implants",
    category: "Dental",
    image: "hf.png",
  },
  {
    id: 18,
    name: "Braces & Aligners",
    description: "Straighten teeth effectively",
    category: "Dental",
    image: "hf.png",
  },
];

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Maham Farman",
    designation: "Dental Surgeon",
    education: "C-Endo, C-Ortho, C-Prostho",
    image: "/Dr.Maham.png",
  },
  {
    id: 2,
    name: " Dr. Farrukh Aqil",
    designation: "Consultant Dental Surgeon",
    education: "BDS, MCPS",
    image: "Dr.Farrukh.png",
  },
  {
    id: 3,
    name: "Dr. Rabia Afreen ",
    designation: "Consultant Orthodontist",
    education: "BDS, MDS (Ortho)",
    image: "/Dr.Rabia.png",
  },
  {
    id: 4,
    name: "Dr. Hamza Khan",
    designation: "General Dentist",
    education: "Implantologist",
    image: "Dr.HamzaKhan.png",
  },
  {
    id: 5,
    name: "Dr. Bilal Qureshi",
    designation: "Consultant Dentist",
    education: "",
    image: "Dr.Bilal.png",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection services={services} />
      <AboutSection />
      <DoctorsSection doctors={doctors} />
      <ContactSection />
    </>
  );
}
