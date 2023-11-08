export interface InterfaceFormatExceptionMessage {
  messageTh: string;
  messageEng: string;
  statusCode?: number;
}

export interface InterfaceException {
  badRequestException(data: InterfaceFormatExceptionMessage): void;
  internalServerErrorException(data?: InterfaceFormatExceptionMessage): void;
  forbiddenException(data?: InterfaceFormatExceptionMessage): void;
  UnauthorizedException(data?: InterfaceFormatExceptionMessage): void;
}
