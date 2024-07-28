import CustomError from "../utils/CustomError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message, vcode: 1 });
  }
  return res.status(500).json({
    message: err.message,
    vscode: 1,
  });
};

export default errorHandler;
