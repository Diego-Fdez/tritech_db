import { HttpException, HttpStatus } from '@nestjs/common';

/* The ErrorManager class creates and throws errors with appropriate HTTP status codes. */
export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  // Create signature error with specific HTTP status code
  public static createSignatureError(message: string) {
    const name = message.split('::')[0];

    if (name) {
      // Check if a specific HTTP status code is defined in HttpStatus
      if (HttpStatus[name]) {
        throw new HttpException(message, HttpStatus[name]);
      } else {
        // Handle unknown error type gracefully, e.g., log the error
        console.error(`Unknown error type: ${name}`);
        throw new HttpException(message, HttpStatus.BAD_REQUEST); // Or a more appropriate default
      }
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Additional error creation methods can be added here, following the same pattern

  // Example: Create a custom error with a specific status code
  public static createCustomError(message: string, statusCode: HttpStatus) {
    throw new HttpException(message, statusCode);
  }
}
