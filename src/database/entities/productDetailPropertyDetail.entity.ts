import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from './productDetail.entity';
import { PropertyDetail } from './propertyDetail.entity';
import { Product } from './product.entity';

@Entity('productDetailPropertyDetails')
export class ProductDetailPropertyDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'productdetailpropertydetailid',
  })
  public productDetailPropertyDetailId: number;

  @Column({ name: 'productdetailid' })
  public productDetailId: number;

  @Column({ name: 'propertydetailid' })
  public propertyDetailId: number;

  @Column({ name: 'productid' })
  public productId: number;

  //  relationship
  @ManyToOne(
    () => ProductDetail,
    (productDetail) => productDetail.productDetailPropertyDetails,
  )
  @JoinColumn({ name: 'productdetailid' })
  public productDetail: ProductDetail;

  @ManyToOne(
    () => PropertyDetail,
    (propertyDetail) => propertyDetail.productDetailPropertyDetails,
  )
  @JoinColumn({ name: 'propertydetailid' })
  public propertyDetail: PropertyDetail;

  @ManyToOne(() => Product, (product) => product.productDetailPropertyDetails)
  @JoinColumn({ name: 'productid' })
  public product: Product;
}
