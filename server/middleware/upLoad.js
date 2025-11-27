import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';
import { v4 as uuidv4 } from 'uuid'; // ייבוא UUID

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(appRoot.path, 'client/img');
    console.log(`Destination Path: ${uploadPath}`); // הדפסת נתיב התיקייה
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4(); // יצירת מזהה ייחודי
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    console.log(`File Name: ${filename}`); // הדפסת שם הקובץ
    cb(null, filename);
  }
});

const upload = multer({ storage });

export const uploadProductImage = upload.single('image');
