import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { MongoService } from 'src/shared/services/mongo.service';

@Injectable()
export class RolesService {
  private nameColletion = "roles";
  constructor(private readonly _mongoService: MongoService) {}
  
  async create(createRoleDto: CreateRoleDto) {
    const returnData = await this._mongoService.create(this.nameColletion, createRoleDto);
    return returnData;
  }

  async findAll() {
    const returnData = await this._mongoService.getAll(this.nameColletion, {});
    return returnData;
  }

  async findOne(id: string) {
    const returnData = await this._mongoService.get(this.nameColletion, id);
    return returnData;
  }
}
