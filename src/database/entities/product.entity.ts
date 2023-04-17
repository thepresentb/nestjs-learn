import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from './property.entity';
import { ProductDetailPropertyDetail } from './productDetailPropertyDetail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'productid' })
  public productId: number;

  @Column({ name: 'productname' })
  public productName: string;

  // relationship
  @OneToMany(() => Property, (property) => property.product)
  public properties?: Property[];

  @OneToMany(
    () => ProductDetailPropertyDetail,
    (productDetailPropertyDetail) => productDetailPropertyDetail.product,
  )
  public productDetailPropertyDetails: ProductDetailPropertyDetail[];
}
