import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../domain/entities/cart.entity';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(productId: number, quantity: number): Promise<Cart> {

    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }

    
    let cart = await this.cartRepository.findOne({ relations: ['orderItems'] });
    if (!cart) {
      cart = await this.cartRepository.save(this.cartRepository.create());
    }

    
    if (cart.orderItems.length >= 3) {
      throw new Error('Maximum de 3 produits différents dans le panier');
    }

    
    const totalCartPrice = cart.orderItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    if (totalCartPrice + product.price * quantity < 5) {
      throw new Error('Le panier doit contenir au moins 5€');
    }

   
    if (totalCartPrice + product.price * quantity > 100) {
      throw new Error('Le panier ne peut pas dépasser 100€');
    }

    
    let orderItem = cart.orderItems.find(item => item.product.id === productId);

    if (!orderItem) {
      
      orderItem = this.orderItemRepository.create({ product, quantity });
      cart.orderItems.push(orderItem);
    } else {
      
      orderItem.quantity += quantity;
    }

    
    await this.cartRepository.save(cart);

    return cart;
  }
}
