import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { PropertyDetail } from './propertyDetail.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'propertyid' })
  public propertyId: number;

  @Column({ name: 'propertyname' })
  public propertyName: string;

  @Column({ name: 'propertysort' })
  public propertySort: string;

  @Column({ name: 'productid' })
  public productId: number;

  // relationship
  @ManyToOne(() => Product, (product) => product.properties)
  @JoinColumn({ name: 'productid' })
  public product: Product;

  @OneToMany(
    () => PropertyDetail,
    (propertyDetail) => propertyDetail.property,
    {},
  )
  public propertyDetails?: PropertyDetail[];
}
