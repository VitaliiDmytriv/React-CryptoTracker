import { Request, Response, NextFunction } from "express";
import { createTxSchema, updTxSchema, mergeTxSchema } from "../schemas/transactions.schema";

export function validateTxPayload(req: Request, res: Response, next: NextFunction) {
  try {
    const { action } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action is required" });
    }

    let schema;
    switch (action) {
      case "edit":
        schema = updTxSchema;
        break;
      case "add":
        schema = createTxSchema;
        break;
      // case "split":
      //   splitTxSchema.parse(req.body);
      //   break;
      case "merge":
        schema = mergeTxSchema;
        break;
      default:
        throw new Error("Unknown action");
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  } catch {
    return res.status(400).json({ message: "" });
  }
}
