import { Response, Request } from "express";

import { ProductDTO } from "../services/dto/product.dto";
import { IProductInterface } from "../services/interfaces/IproductService";

export class ProductController {
  constructor(private productService?: IProductInterface) {}

  async getAll(_req: Request, res: Response): Promise<Response<ProductDTO[]>> {
    try {
      const products = await this.productService?.getAll();
      return res.json(products);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.productService?.create(req.body);
      return res.sendStatus(201);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response<ProductDTO>> {
    try {
      const { id } = req.params;
      const product = await this.productService?.getById(id);
      return res.json(product);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response<boolean>> {
    try {
      const { id } = req.params;
      const { body } = req;
      const isUpdated = await this.productService?.update(id, body);
      return res.json(isUpdated);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response<boolean>> {
    try {
      const { id } = req.params;
      const isDeleted = await this.productService?.delete(id);
      return res.json(isDeleted);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
