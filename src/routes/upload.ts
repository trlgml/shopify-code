import { Router } from 'express';
import multer from 'multer'
import path from 'path';

import uploadCtrl from '../controllerss/upload';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    let extname = path.extname(file.originalname);
    const filename = file.fieldname + "-" + Date.now() + extname;
    cb(null, filename);
  }
})
let upload = multer({ storage: storage, dest: 'public/uploads' }).single("cvs");
const router = Router();

router.post('/', upload, uploadCtrl.upload);

export default router;

