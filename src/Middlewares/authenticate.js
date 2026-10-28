import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../Models/userModel.js';


const requireAuth = asyncHandler (async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || authHeader.startsWith('Bearer')) {
        return res.status(401).json({error: 'Access denied, please provide token'})
    }

    const token = authHeader.replace('Bearer', '')
    const payload = jwt.verify(token, process.env.JWT_SECRET);


const user = await userModel.findById(payload.id);
if (!user) {
    return res.status(404).json({error: 'Access denied, user does. not exist'})
}
req.user = user
next();
});

export default requireAuth;

