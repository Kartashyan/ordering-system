import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../domain/ports/OrderRepositoryInterface";
import { Order } from "../domain/entities/Order";
const _prisma = new PrismaClient();

export class OrderRepositoryImpl implements OrderRepository {
  private prisma: PrismaClient;
  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async save(order: Order) {
    const data = {
      id: order.id,
      status: order.status,
      orderItems: {
        create: order.items.map((item) => ({
          quantity: item.quantity,
          product: {
            connect: {
              id: item.id,
            },
          },
        })),
      },
    };
    const result = await this.prisma.order.upsert({
      where: {
        id: order.id,
      },
      create: data,
      update: data,
    });
    return result;
  }

  async find(id: string) {
    const result = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Order with id <${id}> not found`);
    }

    const items = result.orderItems.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));

    return Order.create(items, result.id, result.status);
  }
}

export const orderRepository = new OrderRepositoryImpl(_prisma);
