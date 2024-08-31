class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode < 400;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };
