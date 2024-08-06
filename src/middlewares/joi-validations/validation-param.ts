import { Request, Response } from "express";
import Joi from "joi";

export const validateParam = (paramName: string) => {
  // Definir el esquema de validación para el parámetro
  const schema = Joi.string()
    .trim()
    .empty()
    .max(50)
    .invalid("null", "undefined", "", `:${paramName}`)
    .required();

  return (req: Request, res: Response, next) => {
    const paramValue = req.params[paramName];

    // Validar el parámetro con el esquema
    const { error } = schema.validate(paramValue);

    if (error) {
      return res
        .status(400)
        .json({ error: `${paramName} cannot be 'null' or 'undefined'` });
    }

    next();
  };
};
