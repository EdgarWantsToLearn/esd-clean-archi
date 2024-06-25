// packages/backend/src/modules/cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from '../presentation/controllers/cart.controller';
import { CartRepository } from '../infrastructure/repositories/cart.repository';
import { AddAddressUseCase } from '../application/use-cases/add-address.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [
    {
      provide: 'ICartRepository',
      useClass: CartRepository,
    },
    AddAddressUseCase,
  ],
})
export class CartModule {}
