import Joi from 'joi';
import asyncHandler from 'express-async-handler'

const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().min(6).required()
});


const validateSignUp = asyncHandler(async (req, res, next) => {
    await registerSchema.validateAsync(req.body);
    if (error) {
  return res.status(400).json({ message: error.details[0].message });
}
    next()
});

const validateLogin = asyncHandler(async (req, res, next) => {
    await loginSchema.validateAsync(req.body);
    if (error) {
  return res.status(400).json({ message: error.details[0].message });
}
    next();
});

export {validateSignUp, validateLogin}