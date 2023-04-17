import { Property } from './../entities/property.entity';
import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/utils/baseRepository/base.astract.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PropertyRepository extends BaseAbstractRepository<Property> {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectDataSource() private dataSource: DataSource,
  ) {
    super(propertyRepository);
  }

  public async getPropertyIdByName(
    productId: number,
    propertyName: string,
  ): Promise<number> {
    const propertyIds = await this.dataSource.query(
      `select propertyid from properties where productid = ${productId} and lower(propertyname) = '${propertyName.toLowerCase()}'`,
    );
    return propertyIds.length === 1 ? Number(propertyIds[0].propertyid) : null;
  }
}
