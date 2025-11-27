import express from 'express'
import User from '../models/user.js'
import Direc from '../models/direc.js'

import {
    addDirec,
    getAllDirectors,
    getDirecByFullName,
    deleteDirecByName

}from '../controllers/adminController.js';
import verifyToken from '../middleware/middleware.js';

const router = express.Router();

//get director 
router.get('/getDirecs',verifyToken, getAllDirectors);
//get director by name
router.post('/getDirecByFullName',verifyToken, getDirecByFullName);
//director register
router.post('/addDirec',verifyToken, addDirec);
//delete director
router.delete('/deleteDirec',verifyToken, deleteDirecByName);


export{router};