class ErrorConstructor extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
  }
}
module.exports = { ErrorConstructor };
