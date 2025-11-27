import User from '../models/user.js';
import Direc from '../models/direc.js';
import bcryptjs from 'bcryptjs';
import exp from 'constants';

// Validate password
export const ValidPwd = (pwd) => {
    let isU= /[A-Z]/.test(pwd), isl=/[a-z]/.test(pwd), isLen = pwd.length >=8;
    console.log('isLen'+isLen+', isU'+  isU+', isl'+ isl);
    return isLen && isU && isl;
};

// Find user by email
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Compare passwords
export const comparePassword = async (inputPwd, storedPwd) => {
    return bcryptjs.compare(inputPwd, storedPwd);
};

// Create and save new user
export const createAndSaveUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
};

// Delete user by email
export const deleteUserByEmail = async (email) => {
    await User.deleteOne({ email });
};

// Validate director credentials
/*export const validateDirectorCredentials = async (direcName, direcPwd, privatePwd, email) => {
    const direc = await Direc.findOne({ direcName });
    if (!direc) return false;
    
    const isDirecPwdMatch = await bcryptjs.compare(direcPwd, direc.direcPwd);
    const isPrivatePwdMatch = await bcryptjs.compare(privatePwd, direc.privatePwd);
    const isEmailMatch = email === direc.email;
    
    return isDirecPwdMatch && isPrivatePwdMatch && isEmailMatch;
};*/
export const validateDirectorCredentials = async (direc, direcPwd, privatePwd, email) => {
    if (!direc) return false;
    
    const isDirecPwdMatch = await bcryptjs.compare(direcPwd, direc.direcPwd);
    const isPrivatePwdMatch = await bcryptjs.compare(privatePwd, direc.privatePwd);
    const isEmailMatch = email === direc.email;
    
    return isDirecPwdMatch && isPrivatePwdMatch && isEmailMatch;
};

//user not found
export const handleUserNotFound = async(res) => {
    return res.status(400).send('User not found.');
}


export const findDirecByDirecName = async (direcName) => {
    //return 
    const direc = await Direc.findOne({ direcName });
    console.log(direc);
    if (direc)
        return direc;
    return res.status(501).send('director not found')
};

//check if director
export const ifDirec = async (secret) => {
    const myEmail = secret;
    const direc = Direc.findOne({myEmail});
    console.log(direc.direcName);
    if (direc) return true;
    return false;
}

export const getUsers = async () => {

        // שלוף את כל המשתמשים ממוינים לפי קריטריונים
        const sortedUsers = await User.find().sort({ 
            city: 1,        // מיין לפי עיר
            street: 1,      // מיין לפי רחוב
            houseNum: 1,    // מיין לפי מספר בית
            userName: 1     // מיין לפי שם משתמש
        })//.exec();

        console.log('sortedUsers',sortedUsers);
        return sortedUsers;
}



export const findUserByName = async (userName) => {
    return await User.find({ userName:userName });
}

/*export const findDirecByDirecName = async(direcName) => {
    try {
        console.log('Attempting to find by direcName:', direcName);
        const direc = await Direc.findOne({ direcName });
        if (!direc) {
          console.log(`No directory found with name: ${direcName}`);
        } else {
          console.log('Found directory:', direc);
        }
        return direc;
      } catch (error) {
        console.error('Error finding directory:', error);
        throw error;
      }
}*/