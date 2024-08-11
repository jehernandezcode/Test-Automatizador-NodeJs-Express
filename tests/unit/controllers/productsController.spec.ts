import { Request, Response } from "express";
import { productController } from "../../../src/controllers/products.controller";
import { productService } from "../../../src/services/product.service";
import { ProductDTO } from "../../../src/services/dto/product.dto";

// Crea un stub para productService.getAll
jest.mock("../../../src/services/product.service");

describe("productController", () => {
  describe("getAll", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
      req = {};
      jsonMock = jest.fn();
      statusMock = jest.fn().mockReturnValue({ json: jsonMock });

      res = {
        json: jsonMock,
        status: statusMock,
      };
    });

    it("should return products when productService.getAll resolves", async () => {
      const mockProducts: ProductDTO[] = [
        { id: "1", name: "Product 1", price: 100, quantity: 10 },
        { id: "2", name: "Product 2", price: 200, quantity: 10 },
      ];

      (productService.getAll as jest.Mock).mockResolvedValue(mockProducts);

      await productController.getAll(req as Request, res as Response);

      expect(productService.getAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it("should return 400 when productService.getAll rejects", async () => {
      const errorMessage = "Error retrieving products";
      (productService.getAll as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await productController.getAll(req as Request, res as Response);

      expect(productService.getAll).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
