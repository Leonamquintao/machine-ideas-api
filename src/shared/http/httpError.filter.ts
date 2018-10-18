import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    // const status = exception.getStatus();
    const status = 404;

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null
    }

    Logger.error(`method: ${request.method} | url: '${request.url}'`, exception.stack, 'EXCEPTIONFILTER')

    response.status(status).json(errorResponse);
  }
}
