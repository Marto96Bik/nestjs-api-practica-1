import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  // el reflector es el que toma la metadata agregada al decorador
  // luego identifica el formato de respuesta.

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseFormat = this.reflector.get<string>(
      'responseFormat',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        if (responseFormat === 'list') {
          return {
            status: 'ok',
            count: Array.isArray(data) ? data.length : 1,
            results: data,
          };
        }

        if (responseFormat === 'detail') {
          return {
            success: 'true',
            item: data,
          };
        }

        // Respuesta default en caso de que no sea list ni detail
        return { data };
      }),
    );
  }
}
