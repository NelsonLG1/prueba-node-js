import { Injectable } from '@nestjs/common';
import { querySalesDay, querySalesMonth } from 'src/shared/scripts/sales';
import { MongoService } from 'src/shared/services/mongo.service';
import { ResponseService } from 'src/shared/services/response.service';
import { ReportsDto } from './dto/reports.dto';

@Injectable()
export class ReportsService extends ResponseService {
    private salesColletion = "sales";
    private productsColletion = "products";
    constructor(private readonly _mongoService: MongoService) { super(); }

    async closingSales(reportsDto: ReportsDto) {
        const salesDay = await this._mongoService.getAllCount(this.salesColletion, querySalesDay(reportsDto.day));
        let totalDay = 0;
        const dateNow = new Date();
        for (const sale of salesDay) {
            const product = await this._mongoService.getQuery(this.productsColletion, { id:sale.products_id });
            totalDay += product.price * sale.qty;
        }
        const dataDay = {
            day: dateNow.toLocaleDateString(),
            totalDay
        }
        return this.responseOK(dataDay);
    }

    async monthSales(reportsDto: ReportsDto) {
        const salesMonth = await this._mongoService.getAllCount(this.salesColletion, querySalesMonth(reportsDto.day));
        let totalMonth = 0;
        const dateNow = new Date();
        for (const sale of salesMonth) {
            const product = await this._mongoService.getQuery(this.productsColletion, { id:sale.products_id });
            totalMonth += product.price * sale.qty;
        }
        const dataMonth = {
            month: dateNow.getMonth()+1,
            totalMonth
        }
        return this.responseOK(dataMonth);
    }
}
