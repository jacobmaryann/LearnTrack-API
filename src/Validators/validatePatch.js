import Joi from "joi";
import asyncHandler from 'express-async-handler';


const validatePatchGoalSchema = Joi.object({
    title: Joi.string().trim().min(1).max(120).optional(),
    description: Joi.string().max(1000).allow('').optional(),
    targetDate: Joi.date().iso().optional(),
    resourceLink: Joi.string().uri({scheme:['https']}).max(2048).allow('').optional()
});


const validatePatchSessionSchema = Joi.object({
    goalId: Joi.string().hex().length(24).required(),
    title: Joi.string().trim().min(1).max(120).optional(),
    description: Joi.string().allow('').optional(),
    status: Joi.string().valid('scheduled', 'completed', 'cancelled').optional()
})

const validateUpdateGoal = asyncHandler(async (req, res, next) =>{
    await validatePatchGoalSchema.validateAsync(req.body);
    next();
});

const validateUpdateSession = asyncHandler(async (req, res, next) => {
    await validatePatchSessionSchema.validateAsync(req.body);
    next();
});

export {validateUpdateGoal, validateUpdateSession};