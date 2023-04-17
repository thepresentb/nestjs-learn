import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/baseRepository/base.astract.repository';
import { ProductDetailPropertyDetail } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class productDetailPropertyDetailRepository extends BaseAbstractRepository<ProductDetailPropertyDetail> {
  constructor(
    @InjectRepository(ProductDetailPropertyDetail)
    private readonly productDetailPropertyRepo: Repository<ProductDetailPropertyDetail>,
  ) {
    super(productDetailPropertyRepo);
  }
}
