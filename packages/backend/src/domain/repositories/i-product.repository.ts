import { Product } from '../entities/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  deleteProduct(productId: string): Promise<void>;
  findAll(): Promise<Product[]>;
}

