import { ProductDTO } from "./dto/product.dto";
import productsData from "./products.json";

const getById = (id: string): ProductDTO => {
  const product = productsData.find((product) => product.id === id);

  if (!product) {
    //Se puede manejar con un Global Exeption Filter
    throw new Error("Product not found");
  }

  //To do - update model
  return product;
};

export const productService = {
  getAll: (): Array<ProductDTO> => productsData as Array<ProductDTO>,

  create: (_data: ProductDTO): void => {
    return;
  },

  getById: (id: string): ProductDTO => {
    return getById(id);
  },

  update: (id: string, _data: ProductDTO): boolean => {
    getById(id);
    //To do - update model
    return true;
  },

  delete: (id: string): boolean => {
    getById(id);

    //To do - update model
    return true;
  },
};
