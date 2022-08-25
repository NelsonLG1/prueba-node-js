import { ApiProperty,  } from "@nestjs/swagger";
import { IsNotEmpty, IsEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty()
    @IsEmpty()
    @IsString()
    readonly id?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
