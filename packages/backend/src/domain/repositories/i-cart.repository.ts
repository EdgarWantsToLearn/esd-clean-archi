import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';
import { OrderItem } from '../entities/order-item.entity';

export interface ICartRepository {
  createCart(cart: Cart): Promise<Cart>;
  updateCart(cart: Cart): Promise<Cart>;
  findById(cartId: string): Promise<Cart | null>;
  addProductToCart(cartId: string, product: Product, quantity: number): Promise<Cart>;
  removeProductFromCart(cartId: string, productId: string): Promise<Cart>;
  clearCart(cartId: string): Promise<void>;
  findOrderItemByCartAndProduct(cartId: string, productId: string): Promise<OrderItem | null>;
  save(cart: Cart): Promise<Cart>;
}

