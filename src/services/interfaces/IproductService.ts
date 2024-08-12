import { ProductDTO } from "../dto/product.dto";

export interface IProductInterface {
  getAll(): Promise<ProductDTO[]>;
  create(data: ProductDTO): Promise<void>;
  getById(id: string): Promise<ProductDTO>;
  update(id: string, data: ProductDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
