import { ResponseCodeEnum } from 'src/constant/responseCode.enum';
import { ResponsePayload } from './responsePayload';
import { ErrorMessageEnum } from 'src/constant/errorMessage.enum';

export class ResponseBuilder<T> {
  private payload: ResponsePayload<T> = {
    statusCode: ResponseCodeEnum.SUCCESS,
  };

  constructor(data?: T) {
    if (data) {
      this.payload.data = data;
    }
  }

  withCode(code: ResponseCodeEnum, withMessage = true): ResponseBuilder<T> {
    this.payload.statusCode = code;
    if (withMessage) {
      this.payload.message = ErrorMessageEnum[ResponseCodeEnum[code]];
    }

    return this;
  }

  withMessage(message: string): ResponseBuilder<T> {
    this.payload.message = message;
    return this;
  }

  withData(data: T): ResponseBuilder<T> {
    this.payload.data = data;
    return this;
  }

  build(): ResponsePayload<T> {
    return this.payload;
  }
}
