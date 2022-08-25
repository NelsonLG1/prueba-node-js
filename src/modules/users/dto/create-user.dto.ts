import { ApiProperty,  } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly document: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly roles_id: string;

}
