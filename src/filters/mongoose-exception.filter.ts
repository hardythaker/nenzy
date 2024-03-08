import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { MongooseError } from "mongoose";

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: MongooseError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = 400; // Bad Request
  
      response.status(status).json({
        message: [exception.message],
        statusCode: status,
        error: "Bad Request",
      });
    }
  }