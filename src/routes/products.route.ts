import express from "express";

import { ProductsModel } from "../models/product.model";
import { ProductController } from "../controllers/products.controller";
import { ProductService } from "../services/product.service";
import { validateBody } from "../middlewares/joi-validations/validation-body";
import { productSchema } from "../middlewares/joi-validations/schemas/product.schema";
import { validateParam } from "../middlewares/joi-validations/validation-param";

const productRouter = express.Router();
const productService = new ProductService(ProductsModel);
const productController = new ProductController(productService);

productRouter.get("/", productController.getAll.bind(productController));

productRouter.post(
  "/",
  validateBody(productSchema),
  productController.create.bind(productController)
);

productRouter.get(
  "/:id",
  validateParam("id"),
  productController.getById.bind(productController)
);

productRouter.put(
  "/:id",
  validateParam("id"),
  validateBody(productSchema),
  productController.update.bind(productController)
);

productRouter.delete(
  "/:id",
  validateParam("id"),
  productController.delete.bind(productController)
);

export default productRouter;
