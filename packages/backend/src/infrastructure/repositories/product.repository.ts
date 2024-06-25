import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/i-product.repository';

export class ProductRepository implements IProductRepository {
  constructor(private readonly productRepository: Repository<Product>) {}

  async deleteProduct(productId: string): Promise<void> {
    await this.productRepository.delete(productId);
  }

  async save(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

}
