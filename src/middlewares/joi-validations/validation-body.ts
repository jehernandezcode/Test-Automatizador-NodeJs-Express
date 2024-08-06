import { Request, Response } from "express";

export const validateBody = (schema) => (req: Request, res: Response, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
