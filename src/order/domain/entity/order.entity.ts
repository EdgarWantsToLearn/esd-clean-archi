import { OrderItem } from 'src/order/domain/entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  constructor(customerName: string, orderItems: OrderItem[]) {
    this.customerName = customerName;
    this.orderItems = orderItems;
    this.status = 'CART'; // Par défaut, le statut est 'CART'
  }

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  shippingAddress: string | null;

  @Column({ nullable: true })
  shippingAddressSetAt: Date | null;

  @Column({ default: 'CART' })
  status: 'CART' | 'SHIPPING_ADDRESS_SET' | 'PAID'; // Déclaration des valeurs possibles pour status

  @Column({ nullable: true })
  paidAt: Date | null; // Date de paiement de la commande

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = 'SHIPPING_ADDRESS_SET'; // Mettre à jour le statut après la définition de l'adresse de livraison
  }

  markAsPaid(): void {
    this.status = 'PAID'; // Marquer la commande comme payée
    this.paidAt = new Date(); // Enregistrer la date de paiement
  }
}

