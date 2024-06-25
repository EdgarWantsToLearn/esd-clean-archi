import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { ProductName } from '../../domain/value-objects/product-name.vo';
import { ProductService } from '../../application/services/product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(
      Number(createProductDto.id),  
      new ProductName(createProductDto.name),
      createProductDto.price,
      createProductDto.description, 
      createProductDto.image,
      createProductDto.color
    );

    return await this.createProductUseCase.execute(product);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<void> {
    await this.deleteProductUseCase.execute(Number(productId)); 
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
