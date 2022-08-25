import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/shared/services/mongo.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRolUserDto } from './dto/update-rol-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const _ = require('underscore');

@Injectable()
export class UsersService {
  private nameColletion = "users";
  constructor(private readonly _mongoService: MongoService) {}

  async create(createUserDto: CreateUserDto) {
    const returnData = await this._mongoService.create(this.nameColletion, createUserDto);
    return returnData;
  }

  async findAll() {
    let users = await this._mongoService.getAll(this.nameColletion, {}, { 'hash':0, 'salt':0 });
    let returnData = _.omit(users, 'data');
    returnData.data = _.map(users.data, function(data) {
      return _.omit(data, 'hash', 'salt');
    })
    return returnData;
  }

  async findOne(id: string) {
    const user = await this._mongoService.get(this.nameColletion, id);
    let returnData = _.omit(user, 'data');
    returnData.data = _.omit(user.data, 'hash', 'salt');
    return returnData;
  }

  async update(id: string, updateUserDto: UpdateUserDto | UpdateRolUserDto) {
    const user = await this._mongoService.update(this.nameColletion, id, updateUserDto);
    let returnData = _.omit(user, 'data');
    returnData.data = _.omit(user.data, 'hash', 'salt');
    return returnData;
  }

  async remove(id: string) {
    const returnData = await this._mongoService.delete(this.nameColletion, id);
    return returnData;
  }

}
