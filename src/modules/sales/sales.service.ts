import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { MongoService } from 'src/shared/services/mongo.service';
const _ = require('underscore');

@Injectable()
export class SalesService {
  private nameColletion = "sales";
  constructor(private readonly _mongoService: MongoService) {}

  async create(createSaleDto: CreateSaleDto) {
    let sale = _.omit(createSaleDto,'sale_at');
    sale.sale_at = new Date(createSaleDto.sale_at);
    const returnData = await this._mongoService.create(this.nameColletion, sale);
    return returnData;
  }

  async findAll() {
    let returnData = await this._mongoService.getAll(this.nameColletion, {});
    return returnData;
  }

  async findOne(id: string) {
    const returnData = await this._mongoService.get(this.nameColletion, id);
    return returnData;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const returnData = await this._mongoService.update(this.nameColletion, id, updateSaleDto);
    return returnData;
  }

  async remove(id: string) {
    const returnData = await this._mongoService.delete(this.nameColletion, id);
    return returnData;
  }
}
