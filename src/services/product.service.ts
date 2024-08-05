import { ProductDTO } from "./dto/product.dto";
import productsData from "./products.json";

export const productService = {
  getAll: (): Array<ProductDTO> => productsData as Array<ProductDTO>,

  create: (data: ProductDTO) => {
    console.log(data);
    return null;
  },
};
