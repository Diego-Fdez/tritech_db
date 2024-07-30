import { Module } from '@nestjs/common';
import { FormService } from './services/form.service';
import { FormController } from './controllers/form.controller';

@Module({
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}
