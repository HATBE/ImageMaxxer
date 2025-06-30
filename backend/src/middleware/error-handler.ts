import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorMessage = err.message || err.name || "Unexpected error!";
  console.error(`[ERROR] ${errorMessage}`);

  res.status(err.statusCode || 500).json({
    status: false,
    message: errorMessage,
    data: { error: err.name || "Unexpected error!" },
  });
};
