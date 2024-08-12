import { ProductDTO } from "./dto/product.dto";
import { ProductsModel } from "../models/product.model";
import { IProductInterface } from "./interfaces/IproductService";

export class ProductService implements IProductInterface {
  private async getByIdImpl(id: string): Promise<ProductDTO> {
    const product = await ProductsModel.findOne<ProductDTO>({
      _id: id,
    });

    if (!product) {
      //Se puede manejar con un Global Exeption Filter
      throw new Error("Product not found");
    }
    return product;
  }

  async getAll(): Promise<ProductDTO[]> {
    const products = await ProductsModel.find<ProductDTO>({});
    return products;
  }

  async create(data: ProductDTO): Promise<void> {
    await ProductsModel.create(data);
    return;
  }

  async getById(id: string): Promise<ProductDTO> {
    return await this.getByIdImpl(id);
  }

  async update(id: string, data: ProductDTO): Promise<boolean> {
    await this.getByIdImpl(id);
    await ProductsModel.findOneAndUpdate({ _id: id }, data);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.getByIdImpl(id);
    await ProductsModel.deleteOne({ _id: id });
    return true;
  }
}
