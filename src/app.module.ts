import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ProductsModule,
    SalesModule
  ],
  controllers: [],
})
export class AppModule {}
