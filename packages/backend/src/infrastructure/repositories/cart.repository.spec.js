import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository } from './cart.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../../domain/entities/cart.entity';
import { Repository } from 'typeorm';

const mockCartRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
 
});

describe('CartRepository', () => {
  let cartRepository: CartRepository;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartRepository,
        { provide: getRepositoryToken(Cart), useFactory: mockCartRepository },
      ],
    }).compile();

    cartRepository = module.get<CartRepository>(CartRepository);
    repository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(cartRepository).toBeDefined();
  });

  it('should find a cart by id', async () => {
    const cart = new Cart();
    repository.findOne.mockResolvedValue(cart);
    expect(await cartRepository.findById('1')).toEqual(cart);
  });

});
