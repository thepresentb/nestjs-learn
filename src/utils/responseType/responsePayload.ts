import { ResponseCodeEnum } from 'src/constant/responseCode.enum';

export interface ResponsePayload<T> {
  statusCode: ResponseCodeEnum;
  message?: string;
  data?: T;
}
