import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongoService } from 'src/shared/services/mongo.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MongoService],
})
export class UsersModule {}
