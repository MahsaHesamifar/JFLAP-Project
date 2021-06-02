class AppError extends Error {
    constructor(message, statusCode) {
        super(message) // Setting the Error message

        this.statusCode = statusCode // Setting the StatusCode of Error
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error' // status of error
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor) // Creating the stack for our Error Object
    }
}

module.exports = AppError