import express from "express";

import productRouter from "./routes/products.route";

const app = express();

const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("Home Api");
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
