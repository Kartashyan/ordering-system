import { Order } from "../order.aggregate";

interface ProductModel {
  id: string;
  name: string;
  price: number;
}

export interface OrderModel {
  id: string;
  items: {
    product: ProductModel;
    quantity: number;
  
  }[];
  status: string;
}

export interface OrderRepository {
  save(order: Order): Promise<void>;
  find(id: string): Promise<Order>;
  exists(id: string): Promise<boolean>;
}
