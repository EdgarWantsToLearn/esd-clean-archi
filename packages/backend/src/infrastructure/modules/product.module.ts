import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../../interfaces/controllers/product.controller';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { ProductService } from '../../application/services/product.service';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { Product } from '../../domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    CreateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
