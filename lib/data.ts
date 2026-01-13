export interface Service {
  id: string;
  label: string;
  description: string;
  category: "Aesthetic" | "Dental";
  duration: string;
  image: string;
  numericId: number;
  capacity?: number; // Number of simultaneous bookings allowed for this service
}

export const DEFAULT_SERVICE_CAPACITY = 3; // Default concurrent bookings allowed

export const SERVICES: Service[] = [
  // Aesthetic Services
  {
    id: "HYDRA-FACIAL",
    label: "HYDRA-FACIAL",
    description: "Deep cleansing facial treatment",
    category: "Aesthetic",
    duration: "60 min",
    image: "hf.png",
    numericId: 1,
  },
  {
    id: "CARBON PEEL",
    label: "CARBON PEEL",
    description: "Carbon laser peel for skin rejuvenation",
    category: "Aesthetic",
    duration: "45 min",
    image: "hf.png",
    numericId: 2,
  },
  {
    id: "OXYGENO",
    label: "OXYGENO",
    description: "Oxygen facial treatment",
    category: "Aesthetic",
    duration: "50 min",
    image: "hf.png",
    numericId: 3,
  },
  {
    id: "PICO LASER",
    label: "PICO LASER",
    description: "Advanced skin rejuvenation",
    category: "Aesthetic",
    duration: "40 min",
    image: "hf.png",
    numericId: 4,
  },
  {
    id: "MICRO NEEDLING",
    label: "MICRO NEEDLING",
    description: "Collagen induction therapy",
    category: "Aesthetic",
    duration: "60 min",
    image: "hf.png",
    numericId: 5,
  },
  {
    id: "HAIR & FACE PRP",
    label: "HAIR & FACE PRP",
    description: "PRP therapy for rejuvenation",
    category: "Aesthetic",
    duration: "75 min",
    image: "hf.png",
    numericId: 6,
  },
  // Dental Services
  {
    id: "Dental consultation",
    label: "Dental Consultation",
    description: "Comprehensive dental check-up",
    category: "Dental",
    duration: "30 min",
    image: "hf.png",
    numericId: 7,
  },
  {
    id: "Dental surgeries",
    label: "Dental Surgeries",
    description: "Safe dental surgical procedures",
    category: "Dental",
    duration: "90 min",
    image: "hf.png",
    numericId: 8,
  },
  {
    id: "Teeth whitening",
    label: "Teeth Whitening",
    description: "Professional teeth whitening",
    category: "Dental",
    duration: "60 min",
    image: "hf.png",
    numericId: 9,
  },
  {
    id: "Scaling & Polishing",
    label: "Scaling & Polishing",
    description: "Professional cleaning",
    category: "Dental",
    duration: "45 min",
    image: "hf.png",
    numericId: 10,
  },
  {
    id: "Full mouth dentures",
    label: "Full Mouth Dentures",
    description: "Custom-fitted dentures",
    category: "Dental",
    duration: "120 min",
    image: "hf.png",
    numericId: 11,
  },
  {
    id: "Dental fillings",
    label: "Dental Fillings",
    description: "High-quality cavity fillings",
    category: "Dental",
    duration: "45 min",
    image: "hf.png",
    numericId: 12,
  },
  {
    id: "Dental X-ray",
    label: "Dental X-ray",
    description: "Digital dental X-rays",
    category: "Dental",
    duration: "15 min",
    image: "hf.png",
    numericId: 13,
  },
  {
    id: "Veneers",
    label: "Veneers",
    description: "Cosmetic veneers",
    category: "Dental",
    duration: "90 min",
    image: "hf.png",
    numericId: 14,
  },
  {
    id: "Root canals",
    label: "Root Canals",
    description: "Pain-free root canal treatment",
    category: "Dental",
    duration: "90 min",
    image: "hf.png",
    numericId: 15,
  },
  {
    id: "Crowns & bridges",
    label: "Crowns & Bridges",
    description: "Restore damaged teeth",
    category: "Dental",
    duration: "90 min",
    image: "hf.png",
    numericId: 16,
  },
  {
    id: "Dental implants",
    label: "Dental Implants",
    description: "Permanent tooth replacement",
    category: "Dental",
    duration: "120 min",
    image: "hf.png",
    numericId: 17,
  },
  {
    id: "Braces & Aligners",
    label: "Braces & Aligners",
    description: "Orthodontic treatment",
    category: "Dental",
    duration: "60 min",
    image: "hf.png",
    numericId: 18,
  },
];

export const TIME_SLOTS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

export const groupedServices = [
  {
    group: "Aesthetic Services",
    items: SERVICES.filter((s) => s.category === "Aesthetic").map((s) => ({
      value: s.id,
      label: s.label,
    })),
  },
  {
    group: "Dental Services",
    items: SERVICES.filter((s) => s.category === "Dental").map((s) => ({
      value: s.id,
      label: s.label,
    })),
  },
];

export const getServiceById = (id: string) => SERVICES.find((s) => s.id === id);

export interface Doctor {
  id: number;
  name: string;
  designation: string;
  education: string;
  image: string;
}

export const DOCTORS: Doctor[] = [
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
