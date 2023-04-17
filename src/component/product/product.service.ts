import { ResponseBuilder } from './../../utils/responseType/responseBuilder';
import { PropertyRepository } from './../../database/repositories/property.repository';
import { PropertyDetailRepository } from './../../database/repositories/propertyDetail.repository';
import { ProductDetailRepository } from './../../database/repositories/productDetail.repository';
import { Injectable } from '@nestjs/common';
import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { Product, ProductDetail, PropertyDetail } from 'src/database/entities';
import { ProductRepository } from 'src/database/repositories';
import { ResponsePayload } from 'src/utils/responseType/responsePayload';
import { PropertiesDto } from './dto/propreties.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly propertyRepository: PropertyRepository,
        private readonly productDetailRepository: ProductDetailRepository,
        private readonly propertyDetailRepository: PropertyDetailRepository,
    ) {}

    async getPaginate(req: {
        productName?: string;
        limit?: number;
        cursorId?: number;
    }): Promise<ResponsePayload<any>> {
        req.limit = req.limit ? Math.min(20, req.limit) : 20;
        const result = await this.productRepository.getPaginate(req);
        return new ResponseBuilder(result).build();
    }

    async getProductByProperties(
        req: PropertiesDto,
    ): Promise<ResponsePayload<any>> {
        let response: {
            product: Product;
            properties: Map<string, any> | null;
            quantity: number;
        };
        const propertyIds = new Map<string, number>();
        const propertyDetailIds: number[] = [];
        const result =
            req.properties &&
            (await this.getPropertyInfo(req, propertyIds, propertyDetailIds));
        if (!(result instanceof Product)) return result;

        const { quantity } =
            await this.productDetailRepository.getQuantityByProperties(
                req.productId,
                propertyDetailIds,
            );

        response = { product: result, properties: req.properties, quantity };
        return new ResponseBuilder(response).build();
    }

    async updateQuantity(info: PropertiesDto, total: number) {
        const propertyIds = new Map<string, number>();
        const propertyDetailIds: number[] = [];
        const result =
            info.properties &&
            (await this.getPropertyInfo(info, propertyIds, propertyDetailIds));
        if (!(result instanceof Product)) return result;

        const { lastId } =
            await this.productDetailRepository.getQuantityByProperties(
                info.productId,
                propertyDetailIds,
                true,
            );

        if (!lastId)
            return new ResponseBuilder()
                .withCode(ResponseCodeEnum.BAD_REQUEST)
                .withMessage('The number of properties not enough')
                .build();

        let productDetail: ProductDetail =
            await this.productDetailRepository.findOneByCondition({
                productDetailId: lastId,
            });

        if (Math.abs(total) > Number(productDetail.quantity))
            return new ResponseBuilder()
                .withCode(ResponseCodeEnum.BAD_REQUEST)
                .withMessage('Quantity not enough')
                .build();

        while (productDetail.parentId !== null) {
            productDetail.quantity += total;
            this.productDetailRepository.update(productDetail);
            productDetail =
                await this.productDetailRepository.findOneByCondition({
                    productDetailId: productDetail.parentId,
                });
            if (productDetail.parentId === null) {
                productDetail.quantity += total;
                this.productDetailRepository.update(productDetail);
            }
        }
        return new ResponseBuilder().withMessage('updated success').build();
    }

    // sub
    async getPropertyInfo(
        req: PropertiesDto,
        propertyIds: Map<string, number>,
        propertyDetailIds: number[],
    ) {
        const product: Product =
            await this.productRepository.findOneByCondition({
                productId: req.productId,
            });
        if (!product) {
            return new ResponseBuilder()
                .withCode(ResponseCodeEnum.BAD_REQUEST)
                .withMessage('productId not found')
                .build();
        }

        for (const key of Object.keys(req.properties)) {
            const propertyId =
                await this.propertyRepository.getPropertyIdByName(
                    req.productId,
                    key,
                );
            if (!propertyId)
                return new ResponseBuilder()
                    .withCode(ResponseCodeEnum.BAD_REQUEST)
                    .withMessage('PropertyName not found')
                    .build();
            propertyIds.set(key, propertyId);
        }

        for (const key of Object.keys(req.properties)) {
            const propertyDetailId =
                await this.propertyDetailRepository.getPropertyDetailIdByCode(
                    propertyIds.get(key),
                    req.properties[key],
                );
            if (!propertyDetailId)
                return new ResponseBuilder()
                    .withCode(ResponseCodeEnum.BAD_REQUEST)
                    .withMessage('Property Code not found')
                    .build();
            propertyDetailIds.push(propertyDetailId);
        }
        return product;
    }
}
