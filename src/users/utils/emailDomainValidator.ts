import { HttpStatus } from '@nestjs/common';
import { ErrorManager } from 'src/utils';

export function emailDomainValidator(email: string): void {
  const emailRegex = /^[\w-\.]+@grupotritech\.com$/i;

  const validateEmail = emailRegex.test(email);

  if (!validateEmail) {
    throw ErrorManager.createCustomError(
      'Invalid email address. Only grupotritech.com domain is allowed.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
