import { ProductService } from "../../src/services/product.service";
import { ProductsModel } from "../../src/models/product.model";

describe("ProductService", () => {
  let productService: ProductService = new ProductService(ProductsModel);

  const product = {
    name: "Product 1",
    price: 1,
    quantity: 3,
  };
  describe("getAll", () => {
    it("should return a products list if found", async () => {
      await ProductsModel.create(product);

      const result = await productService.getAll();

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Product 1");
    });
  });

  describe("create", () => {
    it("should saved a product in db", async () => {
      await productService.create({ ...product, id: "" });

      const result = await productService.getAll();

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Product 1");
    });
  });

  describe("getById", () => {
    it("should get product by id", async () => {
      await productService.create({ ...product, id: "" });

      const getAll = await productService.getAll();

      const result = await productService.getById(getAll[0].id);

      expect(result).toBeDefined();
      expect(result.name).toEqual("Product 1");
    });
  });

  describe("update", () => {
    it("should updated product by id", async () => {
      await productService.create({ ...product, id: "" });

      const getAll = await productService.getAll();

      const newProduct = {
        id: "",
        name: "Product 2",
        price: 20,
        quantity: 10,
      };

      const result = await productService.update(getAll[0].id, newProduct);

      const getUpdated = await productService.getById(getAll[0].id);

      expect(result).toBeDefined();
      expect(result).toBeTruthy();
      expect(getUpdated.name).toEqual("Product 2");
    });
  });

  describe("delete", () => {
    it("should get product by id", async () => {
      await productService.create({ ...product, id: "" });

      let getAll = await productService.getAll();

      const result = await productService.delete(getAll[0].id);

      getAll = await productService.getAll();

      expect(getAll).toBeDefined();
      expect(result).toBeTruthy();
      expect(getAll).toHaveLength(0);
    });
  });
});
