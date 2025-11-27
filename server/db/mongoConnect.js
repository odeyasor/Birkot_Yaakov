import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import Direc from '../models/direc.js';
mongoose.connect('mongodb+srv://birkotYaakov:BiRkOtYaAkOv@cluster0.x7qsfen.mongodb.net/BirkotYaakov')
    .then(() => {
        console.log('Connected to MongoDB');
        ensureDirecExists(direcData)
        .then(result => console.log(result))
        .catch(err => {
            console.error('Fatal error:', err);
            process.exit(1); // הפסקת השרת במקרה של שגיאה חמורה
        });
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));

    async function ensureDirecExists(direcData) {
        const { direcName, fullName, direcPwd, privatePwd, email } = direcData;
    
        try {
            // חיפוש מנהל המערכת לפי שם המשתמש
            const existingDirec = await Direc.findOne({ direcName });
    
            if (existingDirec) {
                // אם מנהל קיים, מחזירים תשובה מתאימה
                console.log('Direc already exists.');
                return 'Direc already exists.';
            }
            
            // אם מנהל לא קיים, יוצרים מנהל חדש
            console.log('Direc not found. Creating new direc.');
    
            // הצפנת סיסמת המנהל
            const saltd = await bcryptjs.genSalt(10);
            const saltp = await bcryptjs.genSalt(10);
            const hashedD = await bcryptjs.hash(direcPwd, saltd);
            console.log('hashedD', hashedD);
            const hashedP = await bcryptjs.hash(privatePwd, saltp);
            console.log('hashedpP', hashedP);

            const newDirec = new Direc({
                direcName: direcName,
                fullName: fullName,
                direcPwd: hashedD,
                privatePwd: hashedP,
                email: email
            });
            console.log('newDirec:', newDirec);
            await newDirec.save();
            console.log('Direc created successfully.');
            return 'Direc created successfully.';
        } catch (err) {
            console.error('Error ensuring direc exists:', err);
            return 'Internal Server Error';
        }
    }
    
    // דוגמת JSON שאתה מעביר לפונקציה
    const direcData = {
        direcName: 'mattis',
        fullName:'מתתיהו הלברשטט',
        direcPwd: 'By6136713',
        privatePwd: "YoNaHn1802",
        email: 'halbermch@gmail.com'
    };
    
    // קריאה לפונקציה
    /*ensureDirecExists(direcData)
        .then(result => console.log(result))
        .catch(err => {
            console.error('Fatal error:', err);
            process.exit(1); // הפסקת השרת במקרה של שגיאה חמורה
        });
    */