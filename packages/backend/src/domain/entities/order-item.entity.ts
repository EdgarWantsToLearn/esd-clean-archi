import { Entity, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
