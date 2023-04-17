import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/baseRepository/base.astract.repository';
import { ProductDetail } from '../entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductDetailRepository extends BaseAbstractRepository<ProductDetail> {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(productDetailRepository);
  }

  public async getQuantityByProperties(
    productId: number,
    propertyDetailIds: number[],
    withLastId: boolean = false,
  ): Promise<{ lastId?: number; quantity: number }> {
    if (propertyDetailIds.length > 0) {
      let filter = '';
      for (let i = 0; i < propertyDetailIds.length; i++) {
        filter += propertyDetailIds[i].toString();
        if (i !== propertyDetailIds.length - 1) filter += ',';
      }
      const productDetails = await this.dataSource.query(
        `select productDetails.quantity, productDetailPropertyDetails.productdetailid ,  count(case when productDetailPropertyDetails.propertydetailid in ( ${filter} ) then 1 end) as 'so_thuoc_tinh_trung' from productDetailPropertyDetails join productDetails on productDetails.productdetailid = productDetailPropertyDetails.productdetailid group by productDetailPropertyDetails.productdetailid having so_thuoc_tinh_trung = ${propertyDetailIds.length}`,
      );
      let quantity = 0;
      for (const item of productDetails) {
        quantity += item.quantity;
      }
      if (withLastId) {
        return {
          lastId:
            productDetails.length === 1
              ? productDetails[0].productdetailid
              : null,
          quantity: quantity,
        };
      }
      return { quantity };
    } else {
      const result = await this.dataSource.query(
        `select sum(quantity) as quantity from clothesshop.productDetails join (select productdetailid from clothesshop.productDetailPropertyDetails where productid = ${productId} group by productdetailid) as tb on productDetails.productdetailid = tb.productdetailid;`,
      );
      // console.log(quantity);
      return { quantity: result[0].quantity };
    }
  }
}
