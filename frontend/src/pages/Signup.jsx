import React, { useContext, useState } from 'react'
import robot from "../assets/robot.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import axios from "axios";



function Signup() {
const [showPassword,setShowPassword]=useState(false); 
const {serverUrl,userData,setUserData}=useContext(userDataContext);
const [err,setErr]=useState("");
const [loading,setLoading]=useState(false);

const[formData,setFormData]=useState({
 
   name:"",
  email:"",
  password:""
 
})
const navigate=useNavigate();
const handleFormData=(e)=>{
   const {name,value}=e.target;
   setFormData(prev=>({
    ...prev,[name]:value
   }))
}


const handleSignUp = async (e)=>{
    e.preventDefault();
    setErr("");
    setLoading(true);
  try {
    const result= await axios.post(`${serverUrl}/api/auth/signup`,
    formData
    ,{withCredentials:true});

      

 setUserData(result.data)
        setLoading(false);
        navigate("/customize")

   } catch (error) {
  setUserData(null)
       setLoading(false);
  setErr(error.response?.data?.message || "Something went wronng");
       

  }
}


  return (
    <div className='w-full min-h-screen bg-cover   bg-center bg-no-repeat flex justify-around items-center   ' style={{backgroundImage:`url(${robot}) `}}>
    <form  onSubmit={handleSignUp}
    className='w-[90%] h-[550px] max-w-[500px] bg-[#00000010] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] p-[20px]'>
      <h1 className='text-white text-[30px] mb-[30px]'>Register to the 
         <span className='text-blue-600 font-bold'> Ai Assistant</span>
        </h1>
        <input type="text" 
        placeholder='Enter Your Name'
         className='w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
          value={formData.name} 
        onChange={handleFormData} 
        required
        name="name"
      
        />
           <input type="email" 
        placeholder='Enter The Email'
         className='w-full h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
          name="email"
           value={formData.email} 
        onChange={handleFormData} 
        required />
     
      <div className='w-full h-[50px] outline-none border-2 border-white rounded-full text-[18px]  relative'>
     <input type={showPassword?"text":"password"} placeholder='Password' className='w-full h-full outline-none px-5 py-4 text-white bg-transparent placeholder:gray-300 rounded-full' 
    name="password"
           value={formData.password} 
        onChange={handleFormData}
        required  />
     {!showPassword &&       <IoEye className='absolute top-[15px] text-white right-2.5 cursor-pointer w-5 h-5' onClick={()=>setShowPassword(true)}/>
}
 {showPassword &&       <IoEyeOff className='absolute top-[15px] text-white right-2.5 w-5 h-5 cursor-pointer' onClick={()=>setShowPassword(false)}/>
}
      </div>
      {err?.length >0 && <p  className='text-red-500 text-[17px]'>{err}</p>}
      <button type='submit' className='min-w-[150px] h-10 rounded-full bg-white mt-3  text-[18px]  font-semibold'
      disabled={loading} > {loading?"Loading...":"SignUp"}</button>
      <p className='text-white font-semibold 'onClick={()=>{navigate("/login")}}>Already have an account? <span className='text-amber-400 font-semibold'>Signin</span></p>
    </form>


    </div>
  )
}

export default Signup;