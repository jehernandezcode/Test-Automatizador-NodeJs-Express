import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";

import { ProductController } from "../../../src/controllers/products.controller";
import { IProductInterface } from "../../../src/services/interfaces/IproductService";
import { ProductDTO } from "../../../src/services/dto/product.dto";

describe("ProductController", () => {
  let productController: ProductController;
  let productService: IProductInterface;
  let res: Partial<Response>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductController,
        {
          provide: "ProductService",
          useValue: {
            getAll: jest.fn(),
            create: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = moduleRef.get<IProductInterface>("ProductService");
    productController = new ProductController(productService);
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    } as unknown as Partial<Response>;
  });

  const products: ProductDTO[] = [
    { id: "1", name: "Product 1", price: 2, quantity: 4 },
  ];

  describe("getAll method", () => {
    it("should return a list of products", async () => {
      jest.spyOn(productService, "getAll").mockResolvedValue(products);

      const productsResult = await productController.getAll(
        {} as any,
        res as Response
      );

      expect(productService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(products);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(typeof productsResult.json).toEqual(typeof Array);
    });

    it("should handle errors", async () => {
      const errorMessage = "Something went wrong";
      jest
        .spyOn(productService, "getAll")
        .mockRejectedValue(new Error(errorMessage));

      await productController.getAll({} as any, res as Response);

      expect(productService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("create method", () => {
    const req = { body: { ...products[0] } } as Request;
    it("should return void, sucessfull", async () => {
      await productController.create(req, res as Response);

      expect(productService.create).toHaveBeenCalledWith(req.body);
      expect(productService.create).toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    it("should handle errors and return status 400", async () => {
      const errorMessage = "Failed to create product";
      jest
        .spyOn(productService, "create")
        .mockRejectedValue(new Error(errorMessage));

      await productController.create(req, res as Response);

      expect(productService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getById method", () => {
    const req = { params: { id: "33dfs3245dd344344433" } } as any;
    it("should return Product by id, sucessfull", async () => {
      jest.spyOn(productService, "getById").mockResolvedValue(products[0]);
      const product = await productController.getById(req, res as Response);

      expect(productService.getById).toHaveBeenCalledWith(req.params.id);
      expect(productService.getById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(product.json).toHaveBeenCalledWith(products[0]);
    });

    it("should handle errors and return status 400", async () => {
      const errorMessage = "Failed to get product by id";
      jest
        .spyOn(productService, "getById")
        .mockRejectedValue(new Error(errorMessage));

      await productController.getById(req, res as Response);

      expect(productService.getById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("update method", () => {
    const req = {
      params: { id: "33dfs3245dd344344433" },
      body: products[0],
    } as any;
    it("should return boolean result, sucessfull", async () => {
      jest.spyOn(productService, "update").mockResolvedValue(true);
      const isUpdated = await productController.update(req, res as Response);

      expect(productService.update).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(productService.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(isUpdated.json).toHaveBeenCalledWith(true);
    });

    it("should handle errors and return status 400", async () => {
      const errorMessage = "Failed to update product by id";
      jest
        .spyOn(productService, "update")
        .mockRejectedValue(new Error(errorMessage));

      await productController.update(req, res as Response);

      expect(productService.update).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("delete method", () => {
    const req = {
      params: { id: "33dfs3245dd344344433" },
    } as any;
    it("should return boolean result, sucessfull", async () => {
      jest.spyOn(productService, "delete").mockResolvedValue(true);
      const isDeleted = await productController.delete(req, res as Response);

      expect(productService.delete).toHaveBeenCalledWith(req.params.id);
      expect(productService.delete).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(isDeleted.json).toHaveBeenCalledWith(true);
    });

    it("should handle errors and return status 400", async () => {
      const errorMessage = "Failed to delete product by id";
      jest
        .spyOn(productService, "delete")
        .mockRejectedValue(new Error(errorMessage));

      await productController.delete(req, res as Response);

      expect(productService.delete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
