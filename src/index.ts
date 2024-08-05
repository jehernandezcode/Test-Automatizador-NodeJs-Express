import express from "express";

import productRouter from "./routes/products.route";
import { connectDB } from "./database/database";
import { PORT } from "./config/config";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("Home Api");
});

app.use("/api/products", productRouter);

//database
connectDB()
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log(`Server listen on port ${PORT || 3000}`);
    });
  })
  .catch(() => {
    console.log("Connection database failed!");
  });
