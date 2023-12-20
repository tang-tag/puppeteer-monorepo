import process from 'node:process'

import { PinoLogger } from 'nestjs-pino'
import { isColorSupported, yellow } from 'colorette'

export class Logger extends PinoLogger {
  constructor(context?: string) {
    super(getPinoOptions())

    context && super.setContext(yellow(`[${context}]`))
  }
}

export function getPinoOptions(opt?: Record<string, unknown>) {
  const { LOG_LEVEL } = process.env

  return {
    pinoHttp: {
      level: LOG_LEVEL || 'debug',
      autoLogging: false, // 关闭部分日志

      // customAttributeKeys: {
      //   req: '请求信息',
      //   res: '响应信息',
      //   err: '错误信息',
      //   responseTime: '响应时间(ms)',
      // },

      // 启用美化输出插件
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: isColorSupported,
          // customColors: 'message:magenta,info:green,debug:blue', // 可自定义颜色
          // levelFirst: true,
          ignore: 'time,pid,hostname,context',
          // translateTime: 'SYS: yyyy-mm-dd HH:MM:ss',
          singleLine: true,
          messageFormat: `{context}  {msg}`,
          // destination: './test.log',
        },
      },
    },
    ...opt,
  }
}
