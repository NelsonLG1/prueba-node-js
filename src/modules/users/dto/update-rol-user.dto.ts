import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRolUserDto {
    @IsNotEmpty()
    @IsString()
    readonly roles_id: string;
}
