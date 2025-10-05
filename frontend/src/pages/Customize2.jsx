// import React, { useContext, useState } from 'react'
// import { userDataContext } from '../context/UserContext'
// import axios from 'axios';
// import {useNavigate} from  "react-router-dom";
// import { IoReturnDownBack } from "react-icons/io5";


// function Customize2() {
//     const {userData,backendImage,selectedImage,setUserData,serverUrl}=useContext(userDataContext);
//     const [assistantName,setAssistantname]=useState(userData?.assistantName || "");
//     const [loading,setLoading]=useState(false); 
// const navigate=useNavigate();
//     const handleUpdateAssistant=async()=>{
//        try{
//         setLoading(true)
//      let formdata = new FormData();
// formdata.append("assistantName", assistantName);

// if (backendImage) {
//    // this is a File (Blob) from input type="file"
//    formdata.append("assistantImage", backendImage);
// } else {
//    // just pass the image URL if selected
//    formdata.append("imageUrl", selectedImage);
// }
// const result = await axios.post(
//   `${serverUrl}/api/user/update`,
//   formdata,
//   {
//     withCredentials: true,
//     headers: { "Content-Type": "multipart/form-data" }
//   }
// );

// console.log(result.data)
// setUserData(result.data);
//               navigate("/")
//        }catch(error){
//        console.log(error);

//        }finally{
//         setLoading(false)
//        }
//     }
    
//   return (
//     <div  className='w-full min-h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5 relative'>

// <IoReturnDownBack className='absolute top-7 left-7 text-white w-8 h-8 cursor-pointer'  onClick={()=> navigate("/customize")}/>
//     <h1 className=' text-white text-[30px] text-center mb-10 font-semibold '>Enter Your  <span className='text-[blue]'>  Assistant Name</span> </h1>
//   <input type="text" 
//         placeholder='eg. shifra'
//          className='w-full max-w-[600px] h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
//      onChange={(e)=> setAssistantname(e.target.value)}
//      value={assistantName}
//         required />
//         {assistantName && <button  className='min-w-[250px] h-10 rounded-full bg-white mt-3  text-[16px]  font-semibold cursor-pointer' disabled={loading} onClick={()=> 
//           {
          
//             handleUpdateAssistant();

//           }
//         }>{loading?"Loading...":"Create your Asssistant"}</button>
// }

//     </div>
//   )
// }

// export default Customize2;
// import React, { useContext, useState } from 'react';
// import { userDataContext } from '../context/UserContext';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { IoReturnDownBack } from "react-icons/io5";

// function Customize2() {
//     const { userData, backendImage, selectedImage, setUserData, serverUrl } = useContext(userDataContext);
//     const [assistantName, setAssistantname] = useState(userData?.assistantName || "");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
// const token = localStorage.getItem("token"); 
//   const handleUpdateAssistant = async () => {
//     if (!assistantName.trim()) return;
//     setLoading(true);
//     const token = localStorage.getItem("token");

//     if (!token) {
//         alert("You are not logged in!");
//         setLoading(false);
//         return;
//     }

//     try {
//         let result;

//         if (backendImage) {
//             const formData = new FormData();
//             formData.append("assistantName", assistantName);
//             formData.append("assistantImage", backendImage);

//             result = await axios.post(
//                 `${serverUrl}/api/user/update`,
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: { 
//                         "Content-Type": "multipart/form-data",
//                         "Authorization": `Bearer ${token}`
//                     }
//                 }
//             );
//         } else {
//             result = await axios.post(
//                 `${serverUrl}/api/user/update`,
//                 { assistantName, imageUrl: selectedImage },
//                 {
//                     withCredentials: true,
//                     headers: { "Authorization": `Bearer ${token}` }
//                 }
//             );
//         }

//         setUserData(result.data);
//         navigate("/");
//     } catch (error) {
//         console.error("Update Assistant Error:", error.response?.data || error.message);
//         alert(error.response?.data?.message || "Something went wrong!");
//     } finally {
//         setLoading(false);
//     }
// };


//     return (
//         <div className='w-full min-h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-5 relative'>
//             <IoReturnDownBack
//                 className='absolute top-7 left-7 text-white w-8 h-8 cursor-pointer'
//                 onClick={() => navigate("/customize")}
//             />
//             <h1 className='text-white text-[30px] text-center mb-10 font-semibold'>
//                 Enter Your <span className='text-[blue]'>Assistant Name</span>
//             </h1>

//             <input
//                 type="text"
//                 placeholder='e.g. Shifra'
//                 className='w-full max-w-[600px] h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
//                 onChange={(e) => setAssistantname(e.target.value)}
//                 value={assistantName}
//                 required
//             />

//             {assistantName && (
//                 <button
//                     className='min-w-[250px] h-10 rounded-full bg-white mt-3 text-[16px] font-semibold cursor-pointer'
//                     disabled={loading}
//                     onClick={handleUpdateAssistant}
//                 >
//                     {loading ? "Loading..." : "Create your Assistant"}
//                 </button>
//             )}
//         </div>
//     );
// }

// export default Customize2;
import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

function Customize2() {
    const { userData, backendImage, selectedImage, setUserData, serverUrl } = useContext(userDataContext);
    const [assistantName, setAssistantname] = useState(userData?.assistantName || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdateAssistant = async () => {
        if (!assistantName.trim()) return;
        setLoading(true);

        try {
            let result;

            if (backendImage) {
                // If user selected a new image file, use FormData
                const formData = new FormData();
                formData.append("assistantName", assistantName);
                formData.append("assistantImage", backendImage);

                result = await axios.post(
                    `${serverUrl}/api/user/update`,
                    formData,
                    {
                        withCredentials: true, // <-- important
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                );
            } else {
                // No new file, send JSON
                result = await axios.post(
                    `${serverUrl}/api/user/update`,
                    { assistantName, imageUrl: selectedImage },
                    { withCredentials: true } // <-- important
                );
            }

            setUserData(result.data);
            navigate("/"); // Redirect after update
        } catch (error) {
            console.error("Update Assistant Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full min-h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-5 relative'>
            <IoReturnDownBack
                className='absolute top-7 left-7 text-white w-8 h-8 cursor-pointer'
                onClick={() => navigate("/customize")}
            />
            <h1 className='text-white text-[30px] text-center mb-10 font-semibold'>
                Enter Your <span className='text-[blue]'>Assistant Name</span>
            </h1>

            <input
                type="text"
                placeholder='e.g. Shifra'
                className='w-full max-w-[600px] h-[50px] outline-none border-2 border-white bg-transparent text-white placeholder:gray-300 rounded-full px-5 py-4 mb-1'
                onChange={(e) => setAssistantname(e.target.value)}
                value={assistantName}
                required
            />

            {assistantName && (
                <button
                    className='min-w-[250px] h-10 rounded-full bg-white mt-3 text-[16px] font-semibold cursor-pointer'
                    disabled={loading}
                    onClick={handleUpdateAssistant}
                >
                    {loading ? "Loading..." : "Create your Assistant"}
                </button>
            )}
        </div>
    );
}

export default Customize2;
