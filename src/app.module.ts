import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Deja vacío si no configuraste contraseña
      database: 'nestjs-api-practica-1-db', // Crea esta base después
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Usa false en producción
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
