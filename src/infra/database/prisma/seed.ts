import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pizzaData = [
  {
    name: "Margherita",
    price: 8.5,
  },
  {
    name: "Pepperoni",
    price: 9.5,
  },
  {
    name: "Hawaiian",
    price: 10,
  },
  {
    name: "Meat Lovers",
    price: 11,
  },
  {
    name: "Veggie",
    price: 9,
  },
  {
    name: "Buffalo Chicken",
    price: 10.5,
  },
  {
    name: "BBQ Chicken",
    price: 10.5,
  },
  {
    name: "Mushroom",
    price: 8.5,
  },
  {
    name: "Supreme",
    price: 12,
  },
  {
    name: "Four Cheese",
    price: 10,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of pizzaData) {
    const pizza = await prisma.product.create({
      data: u,
    });
    console.log(`Created pizza with id: ${pizza.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
