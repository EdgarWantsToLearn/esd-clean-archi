import { Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/repositories/i-cart.repository';
import { AddAddressDto } from '../../presentation/dtos/add-address.dto';

@Injectable()
export class AddAddressUseCase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async execute(cartId: number, addAddressDto: AddAddressDto): Promise<void> {
    const cart = await this.cartRepository.findById(cartId);

    if (cart.paid) {
      throw new Error('Cannot add address to a paid cart.');
    }

    if (cart.cancelled) {
      throw new Error('Cannot add address to a cancelled cart.');
    }

    cart.address = addAddressDto.address;

    await this.cartRepository.save(cart);
  }
}
