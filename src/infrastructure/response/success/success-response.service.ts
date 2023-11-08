import { Res } from '@nestjs/common';
import { InterfaceResponseMassage } from '../../../domain/response/response.interface';
import { InterfaceResponse } from '../../../domain/response/success/success-response.interface';
import { success } from '../../config/return-code/response.config';

export class SuccessResponse implements InterfaceResponse {
  response() {
    return success;
  }
}
