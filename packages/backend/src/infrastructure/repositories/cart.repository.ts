import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../domain/entities/cart.entity';
import { Product } from '../../domain/entities/product.entity';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { ICartRepository } from '../../domain/repositories/i-cart.repository';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createCart(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async updateCart(cart: Cart): Promise<Cart> {
    return this.cartRepository.save(cart);
  }

  async findById(cartId: string): Promise<Cart | null> {
    return this.cartRepository.findOne(cartId, { relations: ['orderItems', 'orderItems.product'] });
  }

  async addProductToCart(cartId: string, product: Product, quantity: number): Promise<Cart> {
    const cart = await this.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const existingOrderItem = await this.findOrderItemByCartAndProduct(cartId, product.id);

    if (existingOrderItem) {
      existingOrderItem.quantity += quantity;
      await this.orderItemRepository.save(existingOrderItem);
    } else {
      const orderItem = new OrderItem();
      orderItem.cart = cart;
      orderItem.product = product;
      orderItem.quantity = quantity;
      cart.orderItems.push(orderItem);
      await this.orderItemRepository.save(orderItem);
    }

    return this.updateCart(cart);
  }

  async removeProductFromCart(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.orderItems = cart.orderItems.filter(item => item.product.id !== productId);
    await this.cartRepository.save(cart);

    return cart;
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.orderItems = [];
    await this.cartRepository.save(cart);
  }

  async findOrderItemByCartAndProduct(cartId: string, productId: string): Promise<OrderItem | null> {
    return this.orderItemRepository.findOne({ where: { cart: { id: cartId }, product: { id: productId } } });
  }
}
