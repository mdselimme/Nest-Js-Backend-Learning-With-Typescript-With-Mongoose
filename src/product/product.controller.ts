/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.shcema';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() data: Product) {
        return this.productService.createProduct(data);
    }

    @Get()
    getAll() {
        return this.productService.getAllProducts();
    }

}
