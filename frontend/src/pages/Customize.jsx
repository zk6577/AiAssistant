

import React, { useContext, useRef, useState } from 'react'
import { RiImageAddLine } from "react-icons/ri";

import Card from '../components/Card'
import robot from "../assets/robot.png"
import robot1 from "../assets/robot1.png"
import robot2 from "../assets/robot2.png"
import robot3 from "../assets/robot3.png"
import robot4 from "../assets/robot4.png"
import robot5 from "../assets/robot5.png"

import robot6 from "../assets/robot6.png"
import  { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { IoReturnDownBack } from "react-icons/io5";







function Customize() {
const {serverUrl,
userData,
setUserData,
frontendImage,setFrontendImage,
backendImage,setBackendImage,
selectedImage,setSelectedImage}=useContext(userDataContext)

const inputImage=useRef()
const handleImage=(e)=>{
 const file= e.target.files[0];
 setBackendImage(file);
 setFrontendImage(URL.createObjectURL(file))

}
 const navigate=useNavigate();
  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 relative '> 

    <IoReturnDownBack className='absolute top-7 left-7 text-white w-8 h-8 cursor-pointer z-50'  onClick={()=> navigate("/")}/>
  <h1 className=' text-white text-[30px] text-center mb-10 font-semibold '>Select your <span className='text-[blue]'> Assistant Image</span></h1>
 <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap  gap-[15px] '>
  
 <Card image={robot}/>
  <Card image={robot1}/>
   <Card image={robot2}/>
   <Card image={robot3}/>
   <Card image={robot4}/>
      <Card image={robot5}/> 
        <Card image={robot6}/>
    <div className={`w-[70px] h-[140px]  md:w-[150px]  md:h-[250px] bg-[#030326] border-2 border-[#0000ff5e] rounded-2xl overflow-hidden hover:shadow-2xl
     hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center gap-[15px]  ${selectedImage =="input" ?"border-4 border-white shadow-2xl shadow-blue-950":"null" } `}
      onClick={()=>{
        inputImage.current.click()
      setSelectedImage("input")
        }}>
      {!frontendImage &&    <RiImageAddLine className='text-white size-5  ' />
}
      {frontendImage &&  <img src={frontendImage} className='h-full object-cover'/> 
}
    </div>
    <input type="file" accept="images/*" ref={inputImage} hidden onChange={handleImage}/>
 </div>
 {selectedImage ?<button  className='min-w-[130px] h-10 rounded-full bg-white mt-3  text-[16px]  font-semibold cursor-pointer' onClick={()=> navigate("/customize2")}>Next</button>
:null}
  </div>
  )
}

export default Customize