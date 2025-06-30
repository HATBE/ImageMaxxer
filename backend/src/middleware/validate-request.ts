import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import JsonResponse from "../models/jsonReponse/JsonResponse";

export default function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = errors
      .array()
      .map((error) => error.msg)
      .join("\n ");
    const errorResponse = new JsonResponse(false, errorMessage, errors.array());
    return res.status(400).json(errorResponse.generate());
  }
  next();
}
