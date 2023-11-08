import { Module } from '@nestjs/common';
import { SuccessResponse } from './success/success-response.service';

@Module({
  providers: [SuccessResponse],
  exports: [SuccessResponse],
})
export class SuccessResponseModule {}
