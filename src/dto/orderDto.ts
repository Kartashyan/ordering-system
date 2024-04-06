import { z } from "zod";

export const OrderDtoSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      quantity: z.number().min(1),
    })
  ),
});

export type OrderDto = z.infer<typeof OrderDtoSchema>;
