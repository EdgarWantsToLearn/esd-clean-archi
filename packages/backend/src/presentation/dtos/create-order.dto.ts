import { IsArray, IsInt, IsNotEmpty, IsString, Length, IsNumber, Min, Max } from 'class-validator';

class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}

export class CreateProductDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(10, 200)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  price: number;

  @IsString()
  @Length(20, 1000)
  description: string;

  @IsString()
  image: string;

  @IsString()
  color: string;
}