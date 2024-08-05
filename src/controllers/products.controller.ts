import { Response, Request } from "express";

import { productService } from "../services/product.service";

export const productController = {
  getAll: (_req: Request, res: Response) => {
    try {
      const products = productService.getAll();
      return res.json(products);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  create: (req: Request, res: Response) => {
    try {
      productService.create(req.body);
      return res.sendStatus(201);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  getById: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = productService.getById(id);
      return res.json(product);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  update: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const isUpdated = productService.update(id, body);
      return res.json(isUpdated);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isDeleted = productService.delete(id);
      return res.json(isDeleted);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
