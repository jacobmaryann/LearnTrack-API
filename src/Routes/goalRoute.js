import express from 'express';
import { createGoal,  getAllGoals, updateGoalById } from '../Controllers/goalController.js';
import { validatePostGoal } from '../Validators/validatePost.js';
import { validateUpdateGoal } from '../Validators/validatePatch.js';
import requireAuth from '../Middlewares/authenticate.js';

const router = express.Router();
router.use(requireAuth)

router.post('/', validatePostGoal, createGoal)

router.get('/',  getAllGoals);

router.patch('/:id', validateUpdateGoal, updateGoalById );


export default router;
