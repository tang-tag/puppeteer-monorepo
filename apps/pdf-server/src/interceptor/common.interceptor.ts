import { CallHandler, ExecutionContext, HttpStatus, Injectable, HttpException as NestHttpException, NestInterceptor } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpException } from '@/exceptions'

import { Logger } from '@/internal/utils'

/**
 * 公共拦截器
 *
 * @example
 * ```js
 *  import { HttpStatus } from '@nestjs/common'
 *  import { HttpException， ResException } from '@/exceptions'
 *
 *  // 系统级错误
 *  throw new HttpException('错了，小弟弟', HttpStatus.BAD_REQUEST)
 *  // 业务错误
 *  throw new ResException('导出失败！', 411, [])
 * ```
 *
 *
 */
@Injectable()
export class CommonInterceptor implements NestInterceptor {
  private log: Logger

  constructor() {
    this.log = new Logger('CommonInterceptor')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()

    this.log.debug(`-> req-url: ${req.url}`)

    return next
      .handle()
      .pipe(
        // 包装返回数据
        map((data) => {
          if (data instanceof NestHttpException)
            throw data
          else
            return { code: HttpStatus.OK, data }
        }),
        // 处理错误数据
        catchError((error) => {
          let exception: NestHttpException

          // 如果返回 res error
          if (error instanceof NestHttpException)
            exception = error
          // 直接使用 httpException
          else
            exception = new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)

          return throwError(() => exception)
        }),
      )
      .pipe()
  }
}
