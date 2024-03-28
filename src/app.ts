import express from "express";
import bodyParser from "body-parser";

import ordersRouter from "./routes/orders";
import menuRouter from "./routes/menu";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/orders", ordersRouter);
app.use("/api/menu", menuRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
