import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    RolesModule
  ],
  controllers: [],
})
export class AppModule {}
