export interface InterfaceFormatExceptionMessage {
  messageTh: string;
  messageEng: string;
  data?: any;
  statusCode?: number;
}

export interface InterfaceException {
  toResponseSuccess(success: InterfaceFormatExceptionMessage, data?: any): void;
  badRequestException(data: InterfaceFormatExceptionMessage): void;
  internalServerErrorException(data?: InterfaceFormatExceptionMessage): void;
  forbiddenException(data?: InterfaceFormatExceptionMessage): void;
  UnauthorizedException(data?: InterfaceFormatExceptionMessage): void;
}
