import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  ProductDetailRepository,
  ProductRepository,
  PropertyDetailRepository,
  PropertyRepository,
  productDetailPropertyDetailRepository,
} from 'src/database/repositories';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {
  Product,
  ProductDetail,
  ProductDetailPropertyDetail,
  Property,
  PropertyDetail,
} from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      ProductDetailPropertyDetail,
      Property,
      PropertyDetail,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductDetailRepository,
    productDetailPropertyDetailRepository,
    PropertyRepository,
    PropertyDetailRepository,
  ],
})
export class ProductModule {}
