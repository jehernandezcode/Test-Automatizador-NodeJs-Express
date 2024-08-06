import express from "express";

import { productController } from "../controllers/products.controller";
import { validateParam } from "../middlewares/joi-validations/validation-param";
import { validateBody } from "../middlewares/joi-validations/validation-body";
import { productSchema } from "../middlewares/joi-validations/schemas/product.schema";

const router = express.Router();

router.get("/", productController.getAll);

router.post("/", validateBody(productSchema), productController.create);

router.get("/:id", validateParam("id"), productController.getById);

router.put(
  "/:id",
  validateParam("id"),
  validateBody(productSchema),
  productController.update
);

router.delete("/:id", validateParam("id"), productController.delete);

export default router;
