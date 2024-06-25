import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductName } from '../../domain/value-objects/product-name.vo';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: ProductName;

  @Column()
  public price: number;

  @Column()
  public description: string;

  @Column()
  public image: string;

  @Column()
  public color: string;

  constructor(
    id: number,
    name: ProductName,
    price: number,
    description: string,
    image: string,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.color = color;
  }
}
