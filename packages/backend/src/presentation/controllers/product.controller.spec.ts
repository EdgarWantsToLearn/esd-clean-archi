import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.usecase';
import { ProductService } from '../../application/services/product.service';

describe('ProductController', () => {
  let productController: ProductController;
  let createProductUseCase: CreateProductUseCase;
  let deleteProductUseCase: DeleteProductUseCase;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: CreateProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteProductUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ProductService,
          useValue: { getAllProducts: jest.fn() },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    createProductUseCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    deleteProductUseCase = module.get<DeleteProductUseCase>(DeleteProductUseCase);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });


});
