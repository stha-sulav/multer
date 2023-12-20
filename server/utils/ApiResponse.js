class ApiResponse {
  constructor(stausCode, data, message) {
    this.stausCode = stausCode;
    this.data = data;
    this.message = message;
    this.success = this.stausCode < 400;
  }
}

export { ApiResponse };
