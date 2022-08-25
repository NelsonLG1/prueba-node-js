import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsDto } from './dto/reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post("closingSales")
  async closingSales(@Body() reportsDto: ReportsDto) {
    return this.reportsService.closingSales(reportsDto);
  }

  @Post("monthSales")
  async monthSales(@Body() reportsDto: ReportsDto) {
    return this.reportsService.monthSales(reportsDto);
  }
}
