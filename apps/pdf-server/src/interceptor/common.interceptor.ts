import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class CommonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.warn('Before...')

    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap(() => console.warn(`After... ${Date.now() - now}ms`)),
      )
  }
}
