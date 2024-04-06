import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { Order } from "../domain/core/Order";
const prisma = new PrismaClient();

export class OrderRepositoryImpl implements OrderRepository {
  private prisma: PrismaClient;
  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async create(order: Order) {
    debugger;
    const result = await this.prisma.order.create({
      data: {
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
      },
    });
    debugger;
    return result;
  }

  async update(order: Order) {
    const result = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: order.status,
      },
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

export const orderRepository = new OrderRepositoryImpl(prisma);
