import { InterfaceResponseMassage } from '../response.interface';

export interface InterfaceException {
  badRequestException(data: InterfaceResponseMassage): void;
  internalServerErrorException(data?: InterfaceResponseMassage): void;
  forbiddenException(data?: InterfaceResponseMassage): void;
  UnauthorizedException(data?: InterfaceResponseMassage): void;
}
