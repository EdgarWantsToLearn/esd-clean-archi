import { IProductRepository } from '../../domain/repositories/i-product.repository';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    await this.productRepository.deleteProduct(productId);
  }
}
