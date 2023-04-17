import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/baseRepository/base.astract.repository';
import { PropertyDetail } from '../entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PropertyDetailRepository extends BaseAbstractRepository<PropertyDetail> {
  constructor(
    @InjectRepository(PropertyDetail)
    private readonly propertyRepository: Repository<PropertyDetail>,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(propertyRepository);
  }

  public async getPropertyDetailIdByCode(
    propertyId: number,
    propertyDetailCode: any,
  ): Promise<number> {
    const propertyDetailIds = await this.dataSource.query(
      `select propertydetailid from propertyDetails where propertyid = ${propertyId} and lower(propertydetailcode) = '${
        typeof propertyDetailCode === 'string'
          ? propertyDetailCode.toLowerCase()
          : propertyDetailCode
      }'`,
    );
    return propertyDetailIds.length === 1
      ? Number(propertyDetailIds[0].propertydetailid)
      : null;
  }
}
