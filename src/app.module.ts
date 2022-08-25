import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/sales/sales.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    ProductsModule,
    SalesModule,
    ReportsModule
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
