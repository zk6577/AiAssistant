

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";


 export const signup=async (req,res)=>{

  try{
const {name,email,password}=req.body;

 const existEmail=await User.findOne({email});
 if(existEmail){
    return res.status(400).json({message:"Email already exists"});
 }
 if(password.length<6){
    return res.status(400).json({message:"Password length must be at least 6 characters"});
 }

const hashedPassword= await bcrypt.hash(password,10)
const user=await User.create({
    name:name,
    email:email,
    password:hashedPassword,

});
const token=  genToken(user._id);

res.cookie("token",token,{
    httpOnly:true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite:"none",
    secure:true
})
return res.status(201).json({user})

  }catch(error){
return res.status(500).json({message:`sign up error ${error}`})
  }


}


export const login=async (req,res)=>{
      try{
const {email,password}=req.body;

 const user=await User.findOne({email});
 if(!user){
    return res.status(400).json({message:"Email does not  exist"});
 }
 const ismatched= await bcrypt.compare(password,user.password);

 if(!ismatched){
    return res.status(400).json({message:"incorrect password"});
 }


const token= genToken(user._id);


res.cookie("token",token,{
    httpOnly:true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite:"none",
    secure:true
})
return res.status(200).json({user})

  }catch(error){
return res.status(500).json({message:`Login  error ${error}`})
  }

}

export const logout=async (req,res)=>{
    try{
 res.clearCookie("token");
return res.status(200).json({message:"User Suceccfully Logout"})




    }catch(error){
return res.status(500).json({message:`Logout  error ${error}`})
    }
}
