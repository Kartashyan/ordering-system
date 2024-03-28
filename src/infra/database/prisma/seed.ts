import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pizzaData = [
  {
    name: "Margherita",
    description: "Simple pizza with tomato sauce and mozzarella cheese.",
    price: 8.5,
  },
  {
    name: "Pepperoni",
    description: "Pepperoni, tomato sauce, and mozzarella cheese.",
    price: 9.5,
  },
  {
    name: "Hawaiian",
    description: "Ham, pineapple, tomato sauce, and mozzarella cheese.",
    price: 10,
  },
  {
    name: "Meat Lovers",
    description: "A variety of meats with tomato sauce and mozzarella cheese.",
    price: 11,
  },
  {
    name: "Veggie",
    description:
      "A variety of vegetables with tomato sauce and mozzarella cheese.",
    price: 9,
  },
  {
    name: "Buffalo Chicken",
    description: "Spicy chicken, buffalo sauce, and mozzarella cheese.",
    price: 10.5,
  },
  {
    name: "BBQ Chicken",
    description: "Chicken, BBQ sauce, onions, and mozzarella cheese.",
    price: 10.5,
  },
  {
    name: "Mushroom",
    description: "Mushrooms, tomato sauce, and mozzarella cheese.",
    price: 8.5,
  },
  {
    name: "Supreme",
    description:
      "Pepperoni, sausage, olives, peppers, onions, tomato sauce, and mozzarella cheese.",
    price: 12,
  },
  {
    name: "Four Cheese",
    description: "A blend of four cheeses with tomato sauce.",
    price: 10,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of pizzaData) {
    const pizza = await prisma.pizza.create({
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
