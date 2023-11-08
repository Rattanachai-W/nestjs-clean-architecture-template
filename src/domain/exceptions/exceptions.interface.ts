export interface InterfaceFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface InterfaceException {
  badRequestException(data: InterfaceFormatExceptionMessage): void;
  internalServerErrorException(data?: InterfaceFormatExceptionMessage): void;
  forbiddenException(data?: InterfaceFormatExceptionMessage): void;
  UnauthorizedException(data?: InterfaceFormatExceptionMessage): void;
}
