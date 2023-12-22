import { HttpStatus, HttpException as NestHttpException } from '@nestjs/common'

/** 业务级错误 */
export class ResException extends NestHttpException {
  constructor(error: string, code: number, data?: unknown) {
    super({ code, error, data }, HttpStatus.OK)
  }
}

/** Http 级错误 */
export class HttpException extends NestHttpException {
  constructor(error: string, code: number) {
    super({ code, error }, code)
  }
}
