import { Injectable } from '@nestjs/common';
import { MongoService } from './services/mongo.service';

@Injectable()
export class AppService {
  constructor(private _mongoService:MongoService) { }

  getProducts() {
    const returnData = this._mongoService.getAll("products", {});
    return returnData;
  }
}
