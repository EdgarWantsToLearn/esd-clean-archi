import { IProductRepository } from '../../domain/repositories/i-product.repository';
import { Product } from '../../domain/entities/product.entity';
import { ProductName } from '../../domain/value-objects/product-name.vo';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: { id: number; name: string; price: number; description: string; image: string; color: string }) {
    const productName = new ProductName(data.name);
    const product = new Product(data.id, productName, data.price, data.description, data.image, data.color);
    return await this.productRepository.save(product);
  }
}

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {

    await this.productRepository.deleteProduct(productId);
  }
}
