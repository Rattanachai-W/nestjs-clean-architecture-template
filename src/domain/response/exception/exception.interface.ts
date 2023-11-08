import { InterfaceResponseMassage } from '../response.interface';

export interface InterfaceException {
  toResponseSuccess(success: InterfaceResponseMassage, data?: any): void;
  badRequestException(data: InterfaceResponseMassage): void;
  internalServerErrorException(data?: InterfaceResponseMassage): void;
  forbiddenException(data?: InterfaceResponseMassage): void;
  UnauthorizedException(data?: InterfaceResponseMassage): void;
}
