import Joi from "joi";
import asyncHandler from 'express-async-handler';


const validatePostGoalSchema = Joi.object({
    title: Joi.string().trim().min(1).max(120).required(),
    description: Joi.string().max(1000).allow('').optional(),
    targetDate: Joi.date().iso().optional(),
    resourceLink: Joi.string().uri({scheme:['https']}).max(2048).allow('').optional()
});


const validatePostSessionSchema = Joi.object({
    goalId: Joi.string().hex().length(24).required(),
    title: Joi.string().trim().min(1).max(120).required(),
    description: Joi.string().allow('').optional(),
    startTime: Joi.date().iso().greater('now').required(),
    durationMinutes: Joi.number().integer().min(1).max(1440).required(),
    status: Joi.string().valid('scheduled', 'completed', 'cancelled').optional()
})

const validatePostGoal = asyncHandler(async (req, res, next) =>{
    await validatePostGoalSchema.validateAsync(req.body);
    next();
});

const validatePostSession = asyncHandler(async (req, res, next) => {
    await validatePostSessionSchema.validateAsync(req.body);
    next();
});

export {validatePostGoal, validatePostSession};