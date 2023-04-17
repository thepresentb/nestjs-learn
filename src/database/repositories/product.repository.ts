import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from 'src/utils/baseRepository/base.astract.repository';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends BaseAbstractRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(productRepository);
  }

  public async getPaginate({
    productName,
    limit,
    cursorId,
  }: {
    productName?: string;
    limit?: number;
    cursorId?: number;
  }) {
    const products =
      !productName && !cursorId
        ? await this.dataSource.query(
            `select * from clothesshop.products limit ${limit}`,
          )
        : await this.dataSource.query(
            `select * from clothesshop.products where ${
              productName ? `productname like '%${productName}%'` : ''
            } ${productName && cursorId ? 'and' : ''} ${
              cursorId ? `productid > ${cursorId}` : ''
            } limit ${limit}`,
          );
    if (products.length === 0) return null;
    const result: Product[] = [];
    for (const item of products) {
      let prd: Product = new Product();
      (prd.productId = item.productid), (prd.productName = item.productname);
      result.push(prd);
    }
    return result;
  }
}
