import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongoService } from 'src/shared/services/mongo.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService,MongoService]
})
export class RolesModule {}
