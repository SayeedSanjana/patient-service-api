import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req,file, cb)=>{
        let ext = path.extname(file.originalname);
        cb(null,  Date.now() + ext);
    }
});

const upload = multer({
    storage:storage,
    fileFilter: (req, file,cb)=>{
        
        if (file.mimetype == 'image/jpeg'||file.mimetype == 'image/png') {
            // console.log(path.relative(file.filename));
            console.log();
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