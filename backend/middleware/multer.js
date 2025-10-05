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

const storage = process.env.NODE_ENV === "production"
  ? multer.memoryStorage() // files stored in memory in production
  : multer.diskStorage({    // keep disk storage for local dev
      destination: (req, file, cb) => cb(null, "./public"),
      filename: (req, file, cb) => cb(null, file.originalname),
    });

const upload = multer({ storage });

export default upload;