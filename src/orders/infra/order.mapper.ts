import { ID } from "../../shared";
import { OrderItem } from "../domain/order-item.value-object";
import { Order } from "../domain/order.aggregate";
import { OrderModel } from "../domain/ports/order.repo-port";

interface OrderPersistanceModel {
    id: string;
    status: string;
    items: {
        productId: string;
        quantity: number;
    }[];
}

export class OrderMapper {
    static toDomain(order: OrderModel): Order {
        const orderItems = order.items.map((item) => {
            return OrderItem.create(String(item.product.id), item.quantity).value();
        });
        return Order.create(
            orderItems,
            ID.create(order.id),
            order.status,
        ).value();
    }
    static toPersistence(order: Order): OrderPersistanceModel {
        return {
            id: order.getId(),
            status: order.status,
            items: order.items.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            }),
        };
    }
}