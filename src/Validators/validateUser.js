import Joi from 'joi';
import asyncHandler from 'express-async-handler'

const registerSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().min(6).required()
});


const validateSignUp = asyncHandler(async (req, res, next) => {
    await registerSchema.validateAsync(req.body);
    next()
});

const validateLogin = asyncHandler(async (req, res, next) => {
    await loginSchema.validateAsync(req.body);
    next();
});

export {validateSignUp, validateLogin}