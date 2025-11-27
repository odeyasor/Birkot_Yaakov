//router
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { login } from '../controller/user.js';
import { register } from '../controller/user.js';
import upload from '../middleware/upload.js'; // ייבוא ה-middleware
const router = express.Router();
router.post('/login', login);
router.post('/register', upload.single('profilePicture'), register); // הוספת  middleware
router.use(verifyToken);
export default router;


//conteroller
const { email, password, name, type, phone } = req.body;
    const profilePicture = req.file ? req.file.path : null; // קבלת נתיב הקובץ

