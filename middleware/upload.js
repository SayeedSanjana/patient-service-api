import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req,file, cb)=>{
        let ext = path.extname(file.originalname);
        let filename = Date.now() + ext;
        // req.body.imagePath = ["uploads/"+filename];
        console.log(file);
        cb(null, filename);
    }
});

const upload = multer({
    storage:storage,
    fileFilter: (req, file,cb)=>{
        if (file.mimetype == 'image/jpg'||file.mimetype == 'image/png') {
            cb(null,true);
        }else{
            console.log("Only JPG or PNG file type supported");
            cb(null, false);
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 2
    }
});

export default upload;