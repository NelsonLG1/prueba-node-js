import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongoService } from 'src/shared/services/mongo.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, MongoService]
})
export class ReportsModule {}
