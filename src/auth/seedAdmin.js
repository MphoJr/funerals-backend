import { prisma } from "../../prisma/client.js";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@example.com";
  const password = "Admin123"; // choose a strong password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    return;
  }

  // Create new admin
  const admin = await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .then(() => {
    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
  });
