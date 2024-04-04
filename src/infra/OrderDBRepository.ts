import { PrismaClient } from "@prisma/client";
import { Order, OrderInterface } from "../domain/core/Order";
import { OrderRepository } from "../domain/OrderRepositoryInterface";
const prisma = new PrismaClient();

export class OrderRepositoryImpl implements OrderRepository {
  private prisma: PrismaClient;
  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(order: Order) {
    return !!this.prisma.order.create({
      data: {
        id: order.id,
        status: order.status,
        items: {
          create: order.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }

  async update(order: Order) {
    return !!this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: order.status,
      },
    });
  }

  async find(id: string) {
    const result = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!result) {
      throw new Error(`Order with id <${id}> not found`);
    }

    const items = result.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    return Order.create(items, result.id, result.status);
  }
}

export const orderRepository = new OrderRepositoryImpl(prisma);
