import userModel from "../Models/userModel.js";
import asyncHandler from 'express-async-handler';
import {hashedPassword, comparePasswords} from '../utils/password.js'
import generateToken from "../utils/genToken.js";
import bcrypt from 'bcrypt'


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    const existingUser = await userModel.findOne({email});
    
    if(existingUser) {
        res.status(400);
        throw new Error('User already exist');
    }

    const hashed = await hashedPassword(password);

    const newUser = new userModel({
        username,
        email,
        password:  hashed 
    });

    await newUser.save();

    res.status(201).json({message: 'registration successful', data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: generateToken (newUser)
    }
    })
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email});
    if (!user) {
        res.status(404);
        throw new Error('user doees not exist');
    }
 
    const isMatch = await comparePasswords(password, user.password);
    if(!isMatch) {
        res.status(400);
        throw new Error('invalid email or password');
    }
res. status(200).json({message: 'login successful', data:{
    id: user._id,
    name: user.name,
    email: user.email,
    token:generateToken(user)
}});
});


const getMyProfile = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id).select('-password').lean(); 

    if (!user) {
         res.status(404);
        throw new Error('User not found');
    }
    res.json({ message: 'User profile retrieved successfully', data: user });
});

export {registerUser, loginUser, getMyProfile};

