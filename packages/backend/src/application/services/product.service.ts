import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/i-product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
