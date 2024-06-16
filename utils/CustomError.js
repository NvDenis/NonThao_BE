class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // Gọi constructor của lớp cha
    this.statusCode = statusCode; // Thêm thuộc tính statusCode để lưu mã lỗi
    Error.captureStackTrace(this, this.constructor); // Ghi lại stack trace
  }
}

export default CustomError;
