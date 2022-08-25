import { ApiProperty,  } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateSaleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly users_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly products_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly qty: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly sale_at: Date;
}
