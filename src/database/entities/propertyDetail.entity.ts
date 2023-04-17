import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { ProductDetailPropertyDetail } from './productDetailPropertyDetail.entity';

@Entity('propertyDetails')
export class PropertyDetail {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'propertydetailid' })
    public propertyDetailId: number;

    @Column({ name: 'propertyid' })
    public propertyId: number;

    @Column({ name: 'propertydetailcode' })
    public propertyDetailCode: string;

    @Column({ name: 'propertydetaildescription' })
    public propertyDetailDescription: string;

    // relationship
    @ManyToOne(() => Property, (property) => property.propertyDetails)
    @JoinColumn({ name: 'propertyid' })
    public property: Property;

    @OneToMany(
        () => ProductDetailPropertyDetail,
        (productDetailPropertyDetail) =>
            productDetailPropertyDetail.propertyDetail,
    )
    public productDetailPropertyDetails?: ProductDetailPropertyDetail[];
}
