import express from "express";
import bodyParser from "body-parser";

import ordersRouter from "./routes/orders";
import menuRouter from "./routes/menu";
import kitchenRouter from "./routes/kitchen";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/orders", ordersRouter);
app.use("/api/menu", menuRouter);
app.use("/api/menu", kitchenRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
