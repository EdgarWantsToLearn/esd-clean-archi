import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { IProductRepository } from '../../domain/repositories/i-product.repository';
import { Product } from '../../domain/entities/product.entity';

const mockProductRepository = () => ({
  getAllProducts: jest.fn(),
});

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: 'IProductRepository', useFactory: mockProductRepository },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<IProductRepository>('IProductRepository');
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should get all products', async () => {
    const products: Product[] = [new Product(1, 'Product 1', 10, 'Desc', 'img', 'color')];
    productRepository.getAllProducts.mockResolvedValue(products);
    expect(await productService.getAllProducts()).toEqual(products);
  });

});
