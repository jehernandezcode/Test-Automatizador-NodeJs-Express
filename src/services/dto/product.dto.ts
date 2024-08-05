export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductMongoResponse {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
