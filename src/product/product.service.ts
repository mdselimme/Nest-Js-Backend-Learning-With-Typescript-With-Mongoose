/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.shcema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { };

    async createProduct(data: Product): Promise<Product> {
        console.log(data)
        const product = new this.productModel(data)
        return await product.save();
    };

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
