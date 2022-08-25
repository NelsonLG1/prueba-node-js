import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoService } from './services/mongo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MongoService],
})
export class AppModule {}
