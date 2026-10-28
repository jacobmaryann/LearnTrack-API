import express from 'express';
import { createSession, getSessions, updateSessionDetailsById, updateSessionStatus } from '../Controllers/SessionController.js';
import { validatePostSession } from '../Validators/validatePost.js';
import { validateUpdateSession } from '../Validators/validatePatch.js';
import requireAuth from '../Middlewares/Authenticate.js';


const router = express.Router();
const app = express();

app.use(requireAuth)

router.post('/', validatePostSession, createSession);

router.get('/',  getSessions);

router.put('/:id', validateUpdateSession, updateSessionDetailsById);

router.patch('/:id/status', validateUpdateSession, updateSessionStatus);


export default router;