import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { MongooseError } from "mongoose";
import { MongoError } from 'mongodb';
@Catch(MongooseError, MongoError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400; // Bad Request

    response.status(status).json({
      message: [exception.message],
      statusCode: status,
    });
  }
}