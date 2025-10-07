// import multer from "multer";



// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public")},

//         filename:(req,file,cb)=>{
//    cb(null,file.originalname);
//         }
//     }
// )


// const upload=multer({storage});


// export default upload;
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

export default upload;

