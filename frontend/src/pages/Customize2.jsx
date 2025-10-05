import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios';
import {useNavigate} from  "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";


function Customize2() {
    const {userData,backendImage,selectedImage,setUserData,serverUrl}=useContext(userDataContext);
    const [assistantName,setAssistantname]=useState(userData?.assistantName || "");
    const [loading,setLoading]=useState(false); 
const navigate=useNavigate();
    const handleUpdateAssistant=async()=>{
       try{
        setLoading(true)
      const payload = {
      assistantName,
      imageUrl: selectedImage, 
    };

          const result= await axios.post(`${serverUrl}/api/user/update`,payload,{withCredentials:true});


console.log(result.data)
setUserData(result.data);
              navigate("/")
       }catch(error){
       console.log(error);

       }finally{
        setLoading(false)
       }
    }
    
  return (
    <div  className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 relative'>

<IoReturnDownBack className='absolute top-7 left-7 text-white w-8 h-8 cursor-pointer'  onClick={()=> navigate("/customize")}/>
    <h1 className=' text-white text-[30px] text-center mb-10 font-semibold '>Enter Your  <span className='text-[blue]'>  Assistant Name</span> </h1>
  <input type="text" 
        placeholder='eg. shifra'
         className='w-full max-w-[600px] h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
     onChange={(e)=> setAssistantname(e.target.value)}
     value={assistantName}
        required />
        {assistantName && <button  className='min-w-[250px] h-10 rounded-full bg-white mt-3  text-[16px]  font-semibold cursor-pointer' disabled={loading} onClick={()=> 
          {
          
            handleUpdateAssistant();

          }
        }>{loading?"Loading...":"Create your Asssistant"}</button>
}

    </div>
  )
}

export default Customize2;
