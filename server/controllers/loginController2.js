import User from '../models/user.js';
import Direc from '../models/direc.js';
import bcryptjs from 'bcryptjs';
import exp from 'constants';
import session from 'express-session';
const emailAdmin = 'halbermch@gmail.com';

//add user - register
export const addUser = async(req, res)=>{
    const {userName,  pwd,email,city, street, houseNum} = req.body;
    console.log(1);
    try{
        console.log('try');
        const newUser = new User({userName,  pwd,email,city, street, houseNum});
        console.log(2);
        let isvalidpwd = ValidPwd(newUser.pwd);
        console.log('isvalidpwd: ' + isvalidpwd)
        if (isvalidpwd)
        {
            await newUser.save();
            res.status(201).send('User created successfully');
        }
        else
            res.status(405).send('oops! pwd is wrong');
    }
    catch (err){
        console.log('chtch');
        res.status(400).send(err);
    }
};

//user login
export const loginUser = async (req, res) => {
    const { email, pwd } = req.body; // קבלת פרטי המייל והסיסמה מהבקשה
    console.log('1');
    try {
        // חיפוש המשתמש לפי מייל
        const user = await User.findOne({ email });
        console.log(2);
        console.log('User found:', user);
        
        if (!user) {
            return res.status(400).send('User not found. Please register.');
        }
        
        console.log('User found. Checking password');
        console.log('Password from request:', pwd);
        console.log('Password from database:', user.pwd);
        
        // השוואת הסיסמה עם הסיסמה המאוחסנת
        const isMatch = await bcryptjs.compare(pwd, user.pwd);
        
        console.log('Password match:', isMatch);
    

    const token = jwt.sign(data, jwtSecretKey);
        if (isMatch) {
            console.log('Login successful');
            // ניתן לשמור מידע כמו ID המשתמש ב-session או Token
            req.session.email = email; // נשמר המייל בסטורג
            console.log('User email stored in session:', req.session.email);
            res.send('Logged in successfully');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (e) {
        console.error('Error logging in:', e); // הדפסת שגיאה מפורטת
        res.status(500).send('Error logging in');
    }
};
//user logout
export const logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to logout');
            } else {
                res.send('Logged out successfully');
            }
        });
    } else {
        res.send('No active session');
    }
};

//delete user

// delete user - remove by email
export const deleteUser = async (req, res) => {
    const { email } = req.body;
    console.log('deleteUser called');
    try {
        console.log('try');
        // מחפש את המשתמש על פי המייל
        const user = await User.findOne({ email });

        if (user) {
            // מוחק את המשתמש אם נמצא
            await User.deleteOne({ email });
            res.status(200).send('User deleted successfully');
        } else {
            // אם המשתמש לא נמצא
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log('catch');
        res.status(400).send(err);
    }
};


//director login
export const loginDirec = async (req, res) => {
    const { direcName, direcPwd, privatePwd, email } = req.body;

    try {
        // חיפוש מנהל לפי שם המנהל
        const direc = await Direc.findOne({ direcName });
        
        if (!direc) {
            // אם המנהל לא נמצא
            return res.status(404).send('Director not found.');
        }

        // בדיקת התאמה עם סיסמת הניהול
        const isDirecPwdMatch = await bcryptjs.compare(direcPwd, direc.direcPwd);
        if (!isDirecPwdMatch) {
            return res.status(400).send('Invalid management password.');
        }

        // בדיקת התאמה עם הקוד הפרטי
        const isPrivatePwdMatch = await bcryptjs.compare(privatePwd, direc.privatePwd);
        if (!isPrivatePwdMatch) {
            return res.status(400).send('Invalid private code.');
        }

        // בדיקת התאמה עם המייל
        if (email !== direc.email) {
            return res.status(400).send('Invalid email.');
        }

        // אם כל הבדיקות מצליחות
        req.session.direcId = direc._id;
        return res.send('Director logged in successfully');
    } catch (e) {
        console.error('Error logging in:', e);
        return res.status(500).send('Error logging in');
    }
};

//director logout
export const logoutDirec = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to logout');
            } else {
                res.send('Director logged out successfully');
            }
        });
    } else {
        res.send('No active session');
    }
};