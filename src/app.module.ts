import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Product } from './domain/entities/product.entity';
import { ProductService } from './application/services/product.service';
import { ProductController } from './interfaces/controllers/product.controller';
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Product], // Ajoutez vos entités ici
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product]), // Ajoutez cette ligne pour enregistrer l'entité Product
    OrderModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController, ProductController], // Ajoutez vos contrôleurs ici
  providers: [
    AppService,
    ProductService,
    { provide: 'IProductRepository', useClass: ProductRepository }, // Ajoutez votre repository ici
  ],
})
export class AppModule {}

