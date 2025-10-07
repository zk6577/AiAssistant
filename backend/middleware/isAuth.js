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

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;
