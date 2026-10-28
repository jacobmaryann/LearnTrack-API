import express from 'express';
import { createGoal,  getAllGoals, updateGoalById } from '../Controllers/GoalController.js';
import { validatePostGoal } from '../Validators/validatePost.js';
import { validateUpdateGoal } from '../Validators/validatePatch.js';
import requireAuth from '../Middlewares/Authenticate.js';

const router = express.Router();
const app = express();

app.use(requireAuth)

router.post('/', validatePostGoal, createGoal)

router.get('/',  getAllGoals);

router.patch('/:id', validateUpdateGoal, updateGoalById );


export default router;