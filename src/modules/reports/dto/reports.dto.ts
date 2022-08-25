import { IsNotEmpty, IsDate } from 'class-validator';

export class ReportsDto {
    @IsNotEmpty()
    @IsDate()
    readonly day: Date;
}
