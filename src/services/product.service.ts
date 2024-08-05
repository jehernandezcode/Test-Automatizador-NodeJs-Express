import { ProductDTO } from "./dto/product.dto";
import { ProductsModel } from "../models/product.model";

const getById = async (id: string): Promise<ProductDTO> => {
  const product = await ProductsModel.findOne<ProductDTO>({
    _id: id,
  });

  if (!product) {
    //Se puede manejar con un Global Exeption Filter
    throw new Error("Product not found");
  }
  return product;
};

export const productService = {
  getAll: async () => {
    const products = await ProductsModel.find<ProductDTO>({});
    return products;
  },

  create: async (data: ProductDTO): Promise<void> => {
    await ProductsModel.create(data);
    return;
  },

  getById: async (id: string): Promise<ProductDTO> => {
    return await getById(id);
  },

  update: async (id: string, data: ProductDTO): Promise<boolean> => {
    await getById(id);
    const updated = await ProductsModel.findOneAndUpdate({ _id: id }, data);
    console.log(updated);
    return true;
  },

  delete: async (id: string): Promise<boolean> => {
    await getById(id);
    await ProductsModel.deleteOne({ _id: id });
    return true;
  },
};
