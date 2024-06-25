import { Controller, Post, Body, Param } from '@nestjs/common';
import { AddAddressUseCase } from '../../application/use-cases/add-address.usecase';
import { AddAddressDto } from '../dtos/add-address.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly addAddressUseCase: AddAddressUseCase) {}

  @Post(':cartId/address')
  async addAddress(
    @Param('cartId') cartId: string,
    @Body() addAddressDto: AddAddressDto,
  ): Promise<void> {
    await this.addAddressUseCase.execute(Number(cartId), addAddressDto);
  }
}

