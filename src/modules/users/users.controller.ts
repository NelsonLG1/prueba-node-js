import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptedPassword } from 'src/shared/helpers/encrypted';
import { UpdateRolUserDto } from './dto/update-rol-user.dto';
const _ = require('underscore');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    let userEntity = _.omit(createUserDto, 'password');
    const datos = encryptedPassword(createUserDto.password);
    userEntity.salt = datos.salt;
    userEntity.hash = datos.hash;
    return this.usersService.create(userEntity);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id/rol')
  updateRol(@Param('id') id: string, @Body() updateRolUserDto: UpdateRolUserDto) {
    return this.usersService.update(id, updateRolUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
