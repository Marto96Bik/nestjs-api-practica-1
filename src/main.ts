import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// TODO 2: Agregar una capa en el controller para manejar que se responde (Response Layer)
// TODO 3: Agregar manejo de excepciones usando el ExceptionFilter de NestJS
// TODO 4: Agregar al sistema que un usuario tiene un rol. Los roles son Admin y User
// TODO 5: Agregar al sistema que un rol tiene ciertos permisos. El admin tiene todos los permisos, el User no tiene ningun permiso excepto que se puede loguear
// TODO 6: Agregar endpoint para recuperar contraseña
