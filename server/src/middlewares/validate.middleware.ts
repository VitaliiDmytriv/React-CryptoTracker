import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/global";

export const validate = <T extends z.ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response<ApiError>, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        fields: z.flattenError(result.error).fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
};
