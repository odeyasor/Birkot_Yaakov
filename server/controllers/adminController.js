//helpers functions

import User from '../models/user.js';
import Direc from '../models/direc.js';
import bcryptjs from 'bcryptjs';
import exp from 'constants';
import session from 'express-session';
import { 
    ValidPwd,
    isAdmin,
    checkDirecPwd,
    createAndSaveDirec,
    getDirectors,
    findDirecByFullName,
    findDirecByEmail,
    deleteDirecByDirecName
} from '../services/adminService.js';
import { findBasketByEmail } from '../services/orderService.js';



//register director
export const addDirec = async (req, res) => {
    try {
        const permit = await isAdmin(req.user);
        console.log('permit', permit);
        if(!permit){
            return res.status(508).send('you are not allowed to do it!');
        }

        const { direcName, fullName, direcPwd, privatePwd, email } = req.body;

          // בדיקת תקינות סיסמאות
          const isDirecPwdMatch = checkDirecPwd(direcPwd);
          console.log('isDirecPwdMatch', isDirecPwdMatch);
          if (!ValidPwd(direcPwd) || !ValidPwd(privatePwd) || !isDirecPwdMatch ) {
              return res.status(400).send('Invalid password format.');
          }

          // הצפנת הסיסמאות
          const hashedDirecPwd = await bcryptjs.hash(direcPwd, 10);
          const hashedPrivatePwd = await bcryptjs.hash(privatePwd, 10);
          
          // יצירת משתמש חדש
          const newDirec = {
            direcName,
            fullName,
            direcPwd: hashedDirecPwd,
            privatePwd: hashedPrivatePwd,
            email
          }
          console.log(newDirec);
          //save in db
          await createAndSaveDirec(newDirec);
          res.status(201).send('Director registered successfully');
    } catch (err) {
        console.error('Error registering director:', err);
        res.status(500).send('Error registering director');
    }
};

//get all the directorates
export const getAllDirectors = async (req, res) => {
    try {
      const permit = await await isAdmin(req.user);
      console.log('permit', permit);
      if(permit == false){
          return res.status(508).send('you are not allowed to do it!');
      }
      const directors = await getDirectors();
      console.log('directors', directors);
      res.status(200).json(directors);
    } catch (error) {
      console.error('Error fetching directors:', error);
      res.status(500).send('Error fetching directors');
    }
};
  
//get director by full name
export const getDirecByFullName = async (req, res) => {    
    try {
      const permit = await isAdmin(req.user);
      //console.log('!permit', !permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { fullName } = req.body;
      if (!fullName) {
        return res.status(400).send('Full name is required');
      }
      console.log('fullName', fullName);
      const directors = await findDirecByFullName(fullName);
      if (!directors) {
        return res.status(404).send('Director not found');
      }
      console.log('directors', directors);
      res.status(200).json(directors);
    } catch (error) {
      console.error('Error fetching director:', error);
      res.status(500).send('Error fetching director');
    }
  };

//Delete director by direcname 
export const deleteDirecByName = async (req, res) => {
    
    try {
      const permit = await isAdmin(req.user);
      //console.log('!permit', !permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { direcName } = req.body;
    if (!direcName) {
      return res.status(400).send('Director name is required');
    }
    
      const director = await deleteDirecByDirecName(direcName);
      if (!director) {
        return res.status(404).send('Director not found');
      }
      res.status(200).send('Director deleted successfully');
    } catch (error) {
      console.error('Error deleting director:', error);
      res.status(500).send('Error deleting director');
    }
  };
