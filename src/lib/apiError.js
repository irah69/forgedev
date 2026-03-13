export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, details?: any }} [options]
   */
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.details = options.details;
  }
}

