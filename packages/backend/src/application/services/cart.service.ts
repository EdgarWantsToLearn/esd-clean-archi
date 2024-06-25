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
    // Recherche du produit
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }

    // Recherche ou création du panier
    let cart = await this.cartRepository.findOne({ relations: ['orderItems'] });
    if (!cart) {
      cart = await this.cartRepository.save(this.cartRepository.create());
    }

    // Vérification de la règle métier - max 3 produits différents
    if (cart.orderItems.length >= 3) {
      throw new Error('Maximum de 3 produits différents dans le panier');
    }

    // Vérification de la règle métier - panier min à 5e
    const totalCartPrice = cart.orderItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    if (totalCartPrice + product.price * quantity < 5) {
      throw new Error('Le panier doit contenir au moins 5€');
    }

    // Vérification de la règle métier - panier maximum à 100e
    if (totalCartPrice + product.price * quantity > 100) {
      throw new Error('Le panier ne peut pas dépasser 100€');
    }

    // Recherche de l'OrderItem existant pour ce produit dans le panier
    let orderItem = cart.orderItems.find(item => item.product.id === productId);

    if (!orderItem) {
      // Création d'un nouvel OrderItem si inexistant
      orderItem = this.orderItemRepository.create({ product, quantity });
      cart.orderItems.push(orderItem);
    } else {
      // Incrémentation de la quantité si l'OrderItem existe déjà
      orderItem.quantity += quantity;
    }

    // Sauvegarde du panier mis à jour
    await this.cartRepository.save(cart);

    return cart;
  }
}
