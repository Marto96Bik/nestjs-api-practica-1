import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOptions } from './app.datasource';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(AppDataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
