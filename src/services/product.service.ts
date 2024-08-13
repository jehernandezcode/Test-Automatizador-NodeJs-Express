import { ProductDTO } from "./dto/product.dto";
import { ProductsModel } from "../models/product.model";
import { IProductInterface } from "./interfaces/IproductService";
import { Types } from "mongoose";

export class ProductService implements IProductInterface {
  constructor(private readonly productsModel: typeof ProductsModel) {}

  async getByIdImpl(id: string): Promise<ProductDTO> {
    const product = await this.productsModel.findOne<ProductDTO>({
      _id: new Types.ObjectId(id),
    });

    if (!product) {
      //Se puede manejar con un Global Exeption Filter
      throw new Error("Product not found");
    }
    return product;
  }

  async getAll(): Promise<ProductDTO[]> {
    const products = await this.productsModel.find<ProductDTO>({});
    return products;
  }

  async create(data: ProductDTO): Promise<void> {
    await this.productsModel.create(data);
    return;
  }

  async getById(id: string): Promise<ProductDTO> {
    return await this.getByIdImpl(id);
  }

  async update(id: string, data: ProductDTO): Promise<boolean> {
    await this.getByIdImpl(id);
    await this.productsModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      data
    );
    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.getByIdImpl(id);
    await this.productsModel.deleteOne({ _id: new Types.ObjectId(id) });
    return true;
  }
}
