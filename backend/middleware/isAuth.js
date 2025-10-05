//  import jwt from "jsonwebtoken"

// const isAuth= (req,res,next)=>{
  
//  try{
//     const token=req.cookies.token;
//     if(!token){
//         return res.status(400).json({message:"token not found"});


//     }
//     const verifyToken= jwt.verify(token,process.env.JWT_SECRET);

//     req.userId=verifyToken.userId;

//     next();

    
    
    
//  }catch(error){
//         return res.status(500).json({message:"is Auth error"});

//  }

    

// }


// export default isAuth;
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function isAuth(req, res, next) {
    try {
        const token = req.cookies.token; // <-- from cookie
        if (!token) return res.status(401).json({ message: "You are not logged in!" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: "You are not logged in!" });
    }
}