import { 
    ifDirec,
    findUserByEmail, 
    comparePassword, 
    createAndSaveUser, 
    deleteUserByEmail, 
    ValidPwd, 
    validateDirectorCredentials,
    handleUserNotFound,
    findDirecByDirecName,
    getUsers,
    findUserByName
} from '../services/loginService.js'; // ייבוא הפונקציות מה-SERVICE
/*//https://www.geeksforgeeks.org/jwt-authentication-with-node-js*/
// User registration

import { generateToken } from "../middleware/generateToken.js";
 
export const addUser = async (req, res) => {
    try {
        console.log('try');
        
        const permit = await ifDirec(req.user);
        if (!permit)
            res.status(508).send('you are not allowed to do it!');
        console.log(permit, 'permit');

        const { userName, pwd,email, city, street, houseNum } = req.body;
        const newUser = { userName, pwd, email, city, street, houseNum };
        console.log(newUser);
        const isvalidpwd = ValidPwd(pwd);
        console.log('isvalidpwd', isvalidpwd);
        if (isvalidpwd) {
            await createAndSaveUser(newUser);
            res.status(201).send('User created successfully');
        } else {
            res.status(405).send('oops! pwd is wrong');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

// User login
export const loginUser = async (req, res) => {
    
    try {
        const { email, pwd } = req.body;

        const user = await findUserByEmail(email);
        console.log('user',user);

        
        
        if (!user) {
            return handleUserNotFound(res);        
        }
        console.log(user);
        const isMatch = await comparePassword(pwd, user.pwd);
        if (!isMatch) {
            return res.status(405).send('pwd is wrong');
        } 
        console.log('isMatch', isMatch);
        const token = await generateToken(user);
        console.log(token, 'this is token');
        
        return res.status(200).json({token, name:user.userName});

    } catch (e) {
        return res.status(500).json({ message: 'Internal server error' ,error:e});
    }
};

// User logout
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

// Delete user
export const deleteUser = async (req, res) => {

    const permit = await ifDirec(req.user);
        if (!permit)
            res.status(508).send('you are not allowed to do it!');
        console.log(permit, 'permit');

    const { email } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (user) {
            await deleteUserByEmail(email);
            res.status(200).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

// Director login
export const loginDirec = async (req, res) => {
    const { direcName, direcPwd, privatePwd, email } = req.body;
    console.log(direcName);
    try {
        console.log('try');
        const direc = await findDirecByDirecName(direcName);
        console.log('direc', direc);
        if (!direc) {
            return handleUserNotFound(res);       
        }

        const isDirec = await validateDirectorCredentials(direc, direcPwd, privatePwd, email);
        console.log('isDirec', isDirec);
        if (!isDirec){
            return res.status(400).send('Invalid credentials or details.');
        }
        console.log('go to token');
        const token = await generateToken(direc);
        console.log('token',token);
        
        return res.status(200).json({token, name:direc.fullName});

    } catch (e) {
        return res.status(500).json({ message: 'Internal server error' ,error:e});
    }
};

// Director logout
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

//get users
export const getAllUsers = async (req, res) => {
    try {
      const permit = await ifDirec(req.user);
      console.log('permit', permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const users = await getUsers();
      console.log('users', users);
      res.status(200).send(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
    }
};
  
//get user by email name
export const getUserByEmail = async (req, res) => {    
    try {
      const permit = await ifDirec(req.user);
      //console.log('!permit', !permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { email } = req.body;
      if (email){
        const user = await findUserByEmail(email)
        return res.status(200).send(user);
      }
      return res.status(403).send('user not found')
    } catch (error) {
      console.error('Error fetching director:', error);
      res.status(500).send('Error fetching director');
    }
};

export const getUserByName = async (req, res) => {    
    try {
      const permit = await ifDirec(req.user);
      //console.log('!permit', !permit);
      if(!permit){
          return res.status(508).send('you are not allowed to do it!');
      }

      const { userName } = req.body;
      if (userName) {
            const users = await findUserByName(userName);
            return res.status(200).send(users);
      }

      return res.status(403).send('user not found')
    } catch (error) {
      console.error('Error fetching director:', error);
      res.status(500).send('Error fetching director');
    }
};