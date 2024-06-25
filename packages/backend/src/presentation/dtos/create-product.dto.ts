import { ProductName } from '../../domain/value-objects/product-name.vo';

export class CreateProductDto {
  id: number;
  name: ProductName;
  price: number;
  description: string;
  image: string;
  color: string;
}

