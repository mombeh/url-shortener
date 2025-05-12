//validators/registervalidator.js
import Joi from "joi";

const registerValidator = Joi.object({
  email: Joi.string().email({ maxDomainSegments: 2 }).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#^(){}[\\]<>])[A-Za-z\\d@$!%*?&#^(){}[\\]<>]{8,}$')
  ).required().messages({
    'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.'
  }),
  confirmPassword: Joi.ref('password'),
})

export const validate = (req, res, next) => {
  const { error } = registerValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const loginSchema = Joi.object({
  email: Joi.string().email({ maxDomainSegments: 2 }).required(),
  password: Joi.string().required(),
})

export const loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
