export default class {
    static newError({ message, statusCode, status, where }) {
        const error = new Error(message)
        error.message = message
        error.statusCode = statusCode
        error.status = status
        error.where = where
        throw error
        }
    }
  