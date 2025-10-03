import { CustomError } from './CustomError';


export class UnhandledValueError extends CustomError {
  constructor(value: never) {
    super(`Unhandled value "${value}" was passed`);
  }
}