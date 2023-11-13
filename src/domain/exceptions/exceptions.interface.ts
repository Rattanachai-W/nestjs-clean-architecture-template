export interface InterfaceFormatExceptionMessage<T = any> {
  messageTh: string;
  messageEng: string;
  data?: T;
  statusCode?: number;
}

export interface InterfaceException<T> {
  toResponseSuccess(success: InterfaceFormatExceptionMessage, data?: T): void;
  badRequestException(data: InterfaceFormatExceptionMessage): void;
  internalServerErrorException(data?: InterfaceFormatExceptionMessage): void;
  forbiddenException(data?: InterfaceFormatExceptionMessage): void;
  UnauthorizedException(data?: InterfaceFormatExceptionMessage): void;
}
