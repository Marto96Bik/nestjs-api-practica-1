import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './app.datasource';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [
    {
      provide: 'AppDataSource',
      useFactory: async () => AppDataSource,
    },
  ],
})
export class AppModule {}
