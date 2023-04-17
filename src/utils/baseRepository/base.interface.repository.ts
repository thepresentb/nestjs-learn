import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  update(data: T | any): Promise<T>;

  // findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: any, withDeleted?: boolean): Promise<T[]>;

  findOneByCondition(filterCondition: any): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: number): Promise<DeleteResult>;

  removeMultiple(ids: number[]): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;
}
