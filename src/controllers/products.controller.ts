import { Response, Request } from "express";

import { productService } from "../services/product.service";
import { ProductDTO } from "../services/dto/product.dto";

export const productController = {
  getAll: async (
    _req: Request,
    res: Response
  ): Promise<Response<ProductDTO[]>> => {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      await productService.create(req.body);
      return res.sendStatus(201);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  getById: async (
    req: Request,
    res: Response
  ): Promise<Response<ProductDTO>> => {
    try {
      const { id } = req.params;
      const product = await productService.getById(id);
      return res.json(product);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  update: async (req: Request, res: Response): Promise<Response<boolean>> => {
    try {
      const { id } = req.params;
      const { body } = req;
      const isUpdated = await productService.update(id, body);
      return res.json(isUpdated);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  delete: async (req: Request, res: Response): Promise<Response<boolean>> => {
    try {
      const { id } = req.params;
      const isDeleted = await productService.delete(id);
      return res.json(isDeleted);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
