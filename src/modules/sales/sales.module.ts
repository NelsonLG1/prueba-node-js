import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongoService } from 'src/shared/services/mongo.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, MongoService]
})
export class SalesModule {}
