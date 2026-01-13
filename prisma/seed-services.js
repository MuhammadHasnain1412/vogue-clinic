const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const services = [
  // Aesthetic Services
  {
    name: "HYDRA-FACIAL",
    description: "Deep cleansing facial treatment for glowing skin",
    category: "Aesthetic",
    isActive: true,
  },
  {
    name: "CARBON PEEL",
    description: "Carbon laser peel for skin rejuvenation",
    category: "Aesthetic",
    isActive: true,
  },
  {
    name: "OXYGENO",
    description: "Oxygen facial treatment for radiant skin",
    category: "Aesthetic",
    isActive: true,
  },
  {
    name: "PICO LASER",
    description: "Advanced skin rejuvenation with PICO laser technology",
    category: "Aesthetic",
    isActive: true,
  },
  {
    name: "MICRO NEEDLING",
    description: "Collagen induction therapy for skin renewal",
    category: "Aesthetic",
    isActive: true,
  },
  {
    name: "HAIR & FACE PRP",
    description:
      "Platelet-rich plasma therapy for hair and facial rejuvenation",
    category: "Aesthetic",
    isActive: true,
  },

  // Dental Services
  {
    name: "Dental consultation",
    description: "Comprehensive dental examination and consultation",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Dental surgeries",
    description: "Safe and effective dental surgical procedures",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Teeth whitening",
    description: "Professional teeth whitening for a brighter smile",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Scaling & Polishing",
    description: "Professional cleaning to remove plaque and stains",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Full mouth dentures",
    description: "Custom-fitted dentures for complete smile restoration",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Dental fillings",
    description: "High-quality cavity fillings with precision",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Dental X-ray",
    description: "Digital dental X-rays for accurate diagnosis",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Veneers",
    description: "Cosmetic veneers for a perfect smile",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Root canals",
    description: "Pain-free root canal treatment",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Crowns & bridges",
    description: "Dental crowns and bridges to restore damaged teeth",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Dental implants",
    description: "Permanent tooth replacement with dental implants",
    category: "Dental",
    isActive: true,
  },
  {
    name: "Braces & Aligners",
    description: "Orthodontic treatment to straighten teeth",
    category: "Dental",
    isActive: true,
  },
];

async function main() {
  console.log("Starting service seeding...");

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { name: service.name },
      update: service,
      create: service,
    });
    console.log(`✓ ${created.name}`);
  }

  console.log(`\n✅ Successfully seeded ${services.length} services!`);
}

main()
  .catch((e) => {
    console.error("Error seeding services:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
