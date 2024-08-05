import express from "express";

import { productController } from "../controllers/products.controller";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post("/", (_req, res) => {
  res.json({
    message: "save product",
  });
});

router.get("/:id", (_req, res) => {
  res.json({
    message: "get product by id",
  });
});

router.put("/:id", (_req, res) => {
  res.json({
    message: "update product by id",
  });
});

router.delete("/:id", (_req, res) => {
  res.json({
    message: "delete product by id",
  });
});

export default router;
