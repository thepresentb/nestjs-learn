import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class PropertiesDto {
  @IsInt()
  productId: number;

  @IsOptional()
  properties?: Map<string, any>;

  @IsBoolean()
  withLastId = false;
}
