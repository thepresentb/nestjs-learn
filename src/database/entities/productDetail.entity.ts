import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetailPropertyDetail } from './productDetailPropertyDetail.entity';

@Entity('productDetails')
export class ProductDetail {
  @PrimaryGeneratedColumn({ name: 'productdetailid', type: 'bigint' })
  public productDetailId: number;

  @Column({ name: 'productdetailname' })
  public productDetailName: string;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'shellprice' })
  public shellPrice: number;

  @Column({ name: 'parentid', nullable: true })
  public parentId?: number;

  // relationship
  @ManyToOne(() => ProductDetail, (productDetail) => productDetail.children)
  @JoinColumn({ name: 'parentid' })
  public parent?: ProductDetail;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.parent)
  public children?: ProductDetail[];

  @OneToMany(
    () => ProductDetailPropertyDetail,
    (productDetailPropertyDetail) => productDetailPropertyDetail.productDetail,
  )
  public productDetailPropertyDetails?: ProductDetailPropertyDetail;
}
