import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { MongoService } from 'src/shared/services/mongo.service';
import { ResponseService } from 'src/shared/services/response.service';
import { readJson } from 'src/shared/helpers/readJson';


@Injectable()
export class ProductsService extends ResponseService {
  private nameColletion = "products";
  constructor(private readonly _mongoService: MongoService) { super();}

  async create(createProductDto: CreateProductDto) {
    const returnData = await this._mongoService.create(this.nameColletion, createProductDto);
    return returnData;
  }

  async findAll() {
    const returnData = await this._mongoService.getAll(this.nameColletion, {});
    return returnData;
  }

  async migrationProducts() {
    const returnData = await this._mongoService.getAllCount(this.nameColletion, {});
    let jsonData = [];
    if(returnData.length <= 0){
       readJson((err, data) => {
        if(err){
          return this.responseError(err.toString(), 501);
        }
        else {
          jsonData = JSON.parse(data);
          jsonData.forEach(item => {
            const product: CreateProductDto = item;
            this.create(product);
          });
        };
        return this.responseOK(jsonData);
      });
      
      return await this.responseOK(jsonData);
    } else {
      return await this.responseOK([], "Ya existe más de un producto");
    } 
  }  
}
