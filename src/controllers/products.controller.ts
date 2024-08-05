import { Response, Request } from "express";

import { productService } from "../services/product.service";

export const productController = {
  getAllProducts: (_req: Request, res: Response) => {
    const products = productService.getAll();
    return res.json(products);
  },

  create: (req: Request, res: Response) => {
    const result = productService.create(req.body);
    return res.json(result);
  },
};
