import express from 'express'
import User from '../models/user.js'
import Direc from '../models/direc.js'
import {
    addUser,
    loginUser,
    logoutUser,
    deleteUser,
    loginDirec,
    logoutDirec,
    getAllUsers,
    getUserByName,
    getUserByEmail
} from '../controllers/loginController.js';
import verifyToken from '../middleware/middleware.js';

const router = express.Router();

//user register
router.post('/addUser',verifyToken, addUser);
//user login
router.post('/loginUser', loginUser);
//user logout
router.post('/logoutUser', logoutUser);
//delete user
router.delete('/deleteUser',verifyToken,deleteUser);

//director login
router.post('/loginDirec', loginDirec);
//director logout
router.post('/logoutDirec', logoutDirec);

//get all users
router.get('/getUsers', verifyToken, getAllUsers);
router.get('/getUserByName', verifyToken, getUserByName);
router.get('/getUserByEmail', verifyToken, getUserByEmail)


export{router};