import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ default: false })
  cancelled: boolean;

  @OneToMany(type => OrderItem, orderItem => orderItem.cart)
  items: OrderItem[];
}
