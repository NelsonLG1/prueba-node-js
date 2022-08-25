import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongoService } from 'src/shared/services/mongo.service';
import { ResponseService } from 'src/shared/services/response.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, MongoService, ResponseService]
})
export class ProductsModule {}
