export class ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResponse<T> extends ApiResponse<T> {
  constructor(message: string, data?: T) {
    super(200, message, data);
  }
}
