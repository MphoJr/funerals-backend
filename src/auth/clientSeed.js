import { prisma } from "../../prisma/client.js";
import bcrypt from "bcryptjs";

async function main() {
  const email = "client@example.com";
  const password = "Client123"; // choose a strong password
  const name = "Test Client";

  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if client already exists
  const existing = await prisma.client.findUnique({ where: { email } });
  if (existing) {
    console.log("Client already exists:", existing.email);
    return;
  }

  // Create new client
  const client = await prisma.client.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log("Seeded client:", client.email);
}

main()
  .then(() => {
    console.log("Client seeding complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding client:", err);
    process.exit(1);
  });
