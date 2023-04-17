import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/database/entities';
import { PropertiesDto } from './dto/propreties.dto';
import { validate } from 'class-validator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('get_paginate')
  async getPaginate(
    @Body() body: { productName?: string; limit?: number; cursorId?: number },
  ) {
    return await this.productService.getPaginate(body);
  }

  @Get('get_product_by_properties')
  async getProductByProperties(@Body() body: PropertiesDto) {
    return this.productService.getProductByProperties(body);
  }

  @Post('update_quantity')
  async updateQuantity(
    @Body() { info, total }: { info: PropertiesDto; total: number },
  ) {
    return this.productService.updateQuantity(info, total);
  }
}
