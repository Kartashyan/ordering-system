import { PrismaClient } from "@prisma/client";
import { Order } from "../domain/order.aggregate";
import { OrderRepository } from "../domain/ports/order.repo-port";
import { OrderMapper } from "./order.mapper";

const _prisma = new PrismaClient();

export class OrderRepositoryImpl implements OrderRepository {
  private prisma: PrismaClient;
  constructor(db: PrismaClient) {
    this.prisma = db;
  }

  async exists(id: string) {
    const result = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    return !!result;
  }

  async save(order: Order) {
    let orderToPersist = OrderMapper.toPersistence(order);

    const createOrder = this.prisma.order.create({
      data: {
        id: orderToPersist.id,
        status: orderToPersist.status,
      },
    });

    const createOrderItems = orderToPersist.items.map((item) => {
      return this.prisma.orderItem.create({
        data: {
          orderId: orderToPersist.id,
          productId: Number(item.productId),
          quantity: item.quantity,
        },
      });
    });

    await this.prisma.$transaction([createOrder, ...createOrderItems]);
    await order.dispatchAll();
  }

  async find(id: string): Promise<Order> {
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
      product: {
        id: String(item.product.id),
        name: item.product.name,
        price: item.product.price,
      },
      quantity: item.quantity,
    }));

    return OrderMapper.toDomain({
      id: result.id,
      items,
      status: result.status,
    });
  }
}

export const orderRepository = new OrderRepositoryImpl(_prisma);
