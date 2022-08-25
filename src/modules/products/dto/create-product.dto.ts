import { ApiProperty,  } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}
