import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(150)
    .invalid("null", "undefined", "")
    .required(),
  price: Joi.number().max(999999999999).positive().precision(4).required(),
  quantity: Joi.number().max(999999999999).positive().required(),
});
