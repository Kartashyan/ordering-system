import { ID } from "../../shared/lib";
import { OrderItem } from "../domain/order-item.value-object";
import { Order } from "../domain/order.aggregate";

interface OrderItemModel {
    productId: string;
    quantity: number;
}

interface OrderModel {
    id: string;
    items: OrderItemModel[];
    status: string;
}

export class OrderMapper {
    static toDomain(order: OrderModel): Order {
        const orderItems = order.items.map((item) => {
            return OrderItem.create(item.productId, item.quantity).value();
        });
        return Order.create(
            orderItems,
            ID.create(order.id),
            order.status,
        ).value();
    }
    static toPersistence(order: Order): OrderModel {
        return {
            id: order.id,
            customerId: order.customerId,
            items: order.items.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            }),
        };
    }
}