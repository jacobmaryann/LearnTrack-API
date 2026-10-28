import asyncHandler from 'express-async-handler';
import goalModel from '../Models/goalModel.js';


const createGoal = asyncHandler(async (req, res) => {
    const { title, description, targetDate, resourceLink } = req.body;

    if (targetDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (new Date(targetDate) < today) {
            res.status(400);
            throw new Error('Target date must be today or later');
        }
    }

    const newGoal = await Goal.create({
        userId: req.user._id,
        title,
        description,
        targetDate,
        resourceLink
    });

    return res.status(201).json({ 
        message: 'Goal created successfully', 
        data: newGoal 
    });
});


const getAllGoals = asyncHandler(async (req, res) => {
    
    const goals = await goalModel.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ 
        message: 'Goals retrieved successfully', 
        data: goals 
    });
});


 const updateGoalById = asyncHandler(async (req, res) => {
    const { title, description, targetDate, resourceLink } = req.body;

    const goal = await goalModel.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    if (!goal.userId.equals(req.user._id)) {
        res.status(403);
        throw new Error('Unauthorized, you do not own this goal');
    }

    if (title) goal.title = title;
    if (description !== undefined) goal.description = description; 
    if (resourceLink !== undefined) goal.resourceLink = resourceLink;

    if (targetDate) {
        const newTime = new Date(targetDate).getTime();
        const existingTime = goal.targetDate ? new Date(goal.targetDate).getTime() : null;

        if (newTime !== existingTime) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (new Date(targetDate) < today) {
                res.status(400);
                throw new Error('New target date must be today or later.');
            }
            goal.targetDate = targetDate;
        }
    }
    
    await goal.save();

    return res.status(200).json({ 
        message: 'Goal updated successfully', 
        data: goal 
    });
});

export {createGoal, getAllGoals, updateGoalById}