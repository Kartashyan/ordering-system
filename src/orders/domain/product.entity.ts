import { Entity, ID, UID, ValueObject } from "../../shared/lib";
import { Price } from "./price.value-object";
import { ProductName } from "./product-name.value-object";

interface ProductProps {
    id: UID;
    name: ProductName;
    price: Price;
}

export class Product extends Entity<ProductProps> {
    private constructor(props: ProductProps) {
        super(props);
    }

    public get name(): ProductName {
        return this.props.name;
    }

    public get price(): Price {
        return this.props.price;
    }

    public static create(name: string, price: number, id?: UID): Product {
        return new Product({
            id: id || ID.create(),
            name: ProductName.create(name),
            price: Price.create(price),
        });
    }
}