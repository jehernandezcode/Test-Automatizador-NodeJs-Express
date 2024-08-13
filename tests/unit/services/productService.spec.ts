import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../../../src/services/product.service";
import { ProductsModel } from "../../../src/models/product.model";
import { ProductDTO } from "../../../src/services/dto/product.dto";

describe("ProductService", () => {
  let productService: ProductService;
  let productModel: jest.Mocked<typeof ProductsModel>;

  const product: ProductDTO = {
    id: "66b185a1f5bd9c95bb17dee9",
    name: "Product 1",
    price: 1,
    quantity: 3,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductsModel,
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
        ProductService,
      ],
    }).compile();

    productModel =
      moduleRef.get<jest.Mocked<typeof ProductsModel>>(ProductsModel);
    productService = new ProductService(productModel);
  });

  describe("getByIdImpl", () => {
    it("should return a product if found", async () => {
      jest.spyOn(productModel, "findOne").mockResolvedValue(product);
      const result = await productService.getByIdImpl(product.id);

      expect(result).toBeDefined();
      expect(productModel.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(product);
    });

    it("should throw an error if product not found", async () => {
      jest.spyOn(productModel, "findOne").mockResolvedValue(null);

      try {
        await productService.getByIdImpl(product.id);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual("Product not found");
      }
    });
  });

  describe("getAll", () => {
    it("should return a products list if found", async () => {
      jest.spyOn(productModel, "find").mockResolvedValue([product]);
      const result = await productService.getAll();

      expect(result).toBeDefined();
      expect(productModel.find).toHaveBeenCalledTimes(1);
      expect(productModel.find).toHaveBeenCalledWith({});
      expect(result).toEqual([product]);
    });
  });

  describe("create", () => {
    it("not should return - user created successfull", async () => {
      await productService.create(product);

      expect(productModel.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("getById", () => {
    it("should return a product - successfull", async () => {
      jest.spyOn(productModel, "findOne").mockResolvedValue(product);
      const result = await productService.getById(product.id);

      expect(result).toBeDefined();
      expect(productModel.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(product);
    });
  });

  describe("update", () => {
    it("should return a boolean true - successfull", async () => {
      jest.spyOn(productModel, "findOne").mockResolvedValue(product);
      const result = await productService.update(product.id, product);

      expect(result).toBeDefined();
      expect(productModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(productModel.findOne).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });

  describe("delete", () => {
    it("should return a boolean true - successfull", async () => {
      jest.spyOn(productModel, "findOne").mockResolvedValue(product);
      const result = await productService.delete(product.id);

      expect(result).toBeDefined();
      expect(productModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(productModel.findOne).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
