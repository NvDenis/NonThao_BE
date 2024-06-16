import CustomError from "../utils/CustomError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message, vcode: 1 });
  }
  return res.status(500).json({
    msg: "Something went wrong",
    vscode: 1,
  });
};

export default errorHandler;
