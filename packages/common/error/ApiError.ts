import { CustomError } from './CustomError';


export class ApiError extends CustomError {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}