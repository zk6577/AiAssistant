// import React, { useContext, useEffect } from 'react'
// import { userDataContext } from '../context/UserContext'

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useState } from 'react';
// import { useRef } from 'react';
// import airesponse from '../assets/airesponse.gif';
// import userinput from  "../assets/userinput.gif";
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross2 } from "react-icons/rx";

// function Home() {

// const navigate=useNavigate()
//   const  {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext);
//   const [listening,setListening]= useState(false);
//   const [userText,setUserText]=useState("");
//    const [aiText,setAiText]=useState("");
//    const [ham,setHam]=useState(false);
//   const isSpeakingRef= useRef(false);
// const recognitionRef=useRef(null)

//  const isRecognizingRef=useRef(false)

// const synth=window.speechSynthesis
  
//   const handleLogOut=async ()=>{
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true});
//       setUserData(null)
//   navigate("/login");

//     } catch (error) {
//       console.log(error)
//     }
//   }
//    const safeStartRecognition = () => {
//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current?.start();
//         console.log("Recognition safely started");
//       } catch (err) {
//         if (err.name !== "InvalidStateError") {
//           console.error("Start error:", err);
//         }
//       }
//     }
//   };


//  const speak = (text) => {
//   if(!text) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//    utterance.lang='hi-IN';
//    const voices=window.speechSynthesis.getVoices();
//    const hindiVoice= voices.find(v => v.lang==="hi-IN");

//    if(hindiVoice){
//     utterance.voice=hindiVoice;
//    }


//     isSpeakingRef.current=true
   
// utterance.onend=()=>{
//         setAiText("")
//   isSpeakingRef.current=false;
//   setTimeout(() => {
//     safeStartRecognition();
//   }, 1000);


// }
//   synth.cancel();
//    synth.speak(utterance);

   
// };


//  const handleCommand= (data)=>{
//   let {type,userInput,response}=data;
//   type = type?.toLowerCase().trim();
//        speak(response);

// if(type=== 'google-search'){
//         const query=encodeURIComponent(userInput);

//         window.open(`https://www.google.com/search?q=${query}`,'_blank')
//        }

//    if(type=== 'calculator-open'){
       

//         window.open(`https://www.google.com/search?q=calculator`,'_blank')
//        }

//   if(type=== 'instagram-open'){
 

//         window.open('https://www.instagram.com/','_blank')
//        }
//    if(type=== 'facebook-open'){
 

//         window.open('https://www.facebook.com/','_blank')
//        }

//     if(type=== 'weather-show'){
 

//         window.open('https://www.google.com/search?q=weather','_blank')
//        }
//     if(type === 'youtube-search' || type==='youtube-play'){
//          const query=encodeURIComponent(userInput);


//         window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank')
//   }





//  }
     
 
//   useEffect(()=>{
//     const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

//    const recognition=new SpeechRecognition()
//    recognition.continuous =true;
//    recognition.lang='en-US';
//    recognition.interimResults=false;
//  recognitionRef.current=recognition;
//    let isMounted=true;
 


//   recognition.onstart=()=>{
//     isRecognizingRef.current=true;
//     setListening(true);
//   }

//   recognition.onend=()=>{
//         isRecognizingRef.current=false;
    
//         setListening(false)
//          if (isMounted && !isSpeakingRef.current) {
//         setTimeout(() => safeStartRecognition(), 1000);
//       }  

//   }




// recognition.onerror=(event)=>{
//   console.warn("Recognition Error :" ,event.error);
//   isRecognizingRef.current=false
//    setListening(false);
//    if(event.error !== "aborted"&& !isRecognizingRef.current){
//           setTimeout(() => safeStartRecognition(), 1000);

//    }
// }





//    recognition.onresult= async (e)=>{
//   const transcript=e.results[e.results.length-1][0].transcript.trim()
 
// if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
//   setAiText("")
//   setUserText(transcript)
//   recognition.stop();
//   isRecognizingRef.current=false;
//   setListening(false)
//     const data= await  getGeminiResponse(transcript)
//  console.log(data.response);
//     handleCommand(data);
//     setAiText(data.response);
//     setUserText("")
// }


//    }
//     setTimeout(() => safeStartRecognition(), 1000);


// return ()=>{
//   isMounted=false;
//   recognition.stop()
//   synth.cancel();
//   setListening(false)
//   isRecognizingRef.current=false
 
// }
 



//   },[]);


  
//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black]
//      to-[rgba(3,3,83,0.94)] flex justify-center items-center flex-col gap-4  relative'>
      
//       <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>setHam(true)}/>
// <div
//   className={`fixed top-0 w-full h-full bg-[#00000050] backdrop-blur-lg p-[20px] flex flex-col gap-5  items-start transform transition-transform duration-500 ${
//     ham ? "translate-x-0" : "translate-x-full" 
//   }`}
// >
// <RxCross2  className=' text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] ' onClick={()=>setHam(false)}/>
//   <button type='submit' className='min-w-[150px] h-10 rounded-full bg-white    text-[19px]  font-semibold
//          px-2 py-1'
//      onClick={handleLogOut} > Logout</button>
//    <button type='submit' className='min-w-[150px] h-10 rounded-full bg-white   text-[19px]  font-semibold  px-2 py-1'
//      onClick={()=>navigate("/customize")} > Customize Your Assistant</button>
     
//      <div className='w-full h-[2px] bg-gray-400'></div>
//       <h1 className='text-white font-semibold text-[19px]'>History</h1>
//       <div className='w-full  gap-5 overflow-auto flex-1 overflow-y-auto flex-col '>
//        {userData.history?.map((his,key)=>(
//       <p key={key} className='text-white text-[18px] overflow-hidden mt-[20px]'>{his}</p>
//        ))}
//       </div>
      
//      </div>
//        <button type='submit' className='min-w-[150px] h-10 rounded-full bg-white  absolute hidden md:block top-[20px] right-[20px] text-[19px]  font-semibold
//          px-2 py-1'
//      onClick={handleLogOut} > Logout</button>
//   <button type='submit' className='min-w-[150px] h-10 rounded-full bg-white   absolute hidden md:block top-[80px] right-[20px]   text-[19px]  font-semibold  px-2 py-1'
//      onClick={()=>navigate("/customize")} > Customize Your Assistant</button>
      
    
//       <div className='md:w-[300px] md:h-[400px] w-[200px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg '>    
        
        
//         <img src={userData?.assistantImage} className=' h-full object-cover '/>
//          </div>
// <h1 className='text-white font-semibold text-lg'> I'm {userData.assistantName}</h1>
// {!aiText && <img src={userinput} className='w-[100px] rounded-full '/>}
// {aiText && <img src={airesponse} className='w-[100px] rounded-full' />}


// <h1 className='text-white break-words text-wrap text-[18px] font-semibold mb-[20px]'>{userText?userText :aiText?aiText:null}</h1>
//     </div>
//   )
// }



// export default Home;


// import React, { useContext, useEffect, useRef, useState } from "react";
// import { userDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import airesponse from "../assets/airesponse.gif";
// import userinput from "../assets/userinput.gif";
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross2 } from "react-icons/rx";

// function Home() {
//   const navigate = useNavigate();
//   const { userData, serverUrl, setUserData, getGeminiResponse } =
//     useContext(userDataContext);

//   const [listening, setListening] = useState(false);
//   const [userText, setUserText] = useState("");
//   const [aiText, setAiText] = useState("");
//   const [ham, setHam] = useState(false);

//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const isRecognizingRef = useRef(false);

//   const synth = window.speechSynthesis;
//   const [hindiVoice, setHindiVoice] = useState(null);


//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = synth.getVoices();
//       const hiVoice = voices.find((v) => v.lang === "hi-IN");
//       if (hiVoice) setHindiVoice(hiVoice);
//     };
//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserData(null);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const safeStartRecognition = () => {
//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current?.start();
//         console.log("Recognition safely started");
//       } catch (err) {
//         if (err.name !== "InvalidStateError") {
//           console.error("Start error:", err);
//         }
//       }
//     }
//   };

//   const speak = (text) => {
//     if (!text) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "hi-IN";
//     if (hindiVoice) utterance.voice = hindiVoice;

//     isSpeakingRef.current = true;

//     utterance.onend = () => {
//       setAiText("");
//       isSpeakingRef.current = false;
//       setTimeout(() => safeStartRecognition(), 1500);
//     };

//     synth.cancel();
//     synth.speak(utterance);
//   };

//   const handleCommand = (data) => {
//     let { type, userInput, response } = data;
//     type = type?.toLowerCase().trim();
//     speak(response);

//     if (type === "google-search") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`, "_blank");
//     }

//     if (type === "calculator-open") {
//       window.open(`https://www.google.com/search?q=calculator`, "_blank");
//     }

//     if (type === "instagram-open") {
//       window.open("https://www.instagram.com/", "_blank");
//     }

//     if (type === "facebook-open") {
//       window.open("https://www.facebook.com/", "_blank");
//     }

//     if (type === "weather-show") {
//       window.open("https://www.google.com/search?q=weather", "_blank");
//     }

//     if (type === "youtube-search" || type === "youtube-play") {
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
//     }
//   };

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognitionRef.current = recognition;

//     let isMounted = true;

//     recognition.onstart = () => {
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (isMounted && !isSpeakingRef.current) {
//         setTimeout(() => safeStartRecognition(), 1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.warn("Recognition Error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (event.error !== "aborted") {
//         setTimeout(() => safeStartRecognition(), 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();

//       if (
//         transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
//       ) {
//         setAiText("");
//         setUserText(transcript);
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);

//         const data = await getGeminiResponse(transcript);
//         console.log(data.response);
//         handleCommand(data);
//         setAiText(data.response);
//         setUserText("");
//       }
//     };

   
//     setTimeout(() => safeStartRecognition(), 1000);

//     return () => {
//       isMounted = false;
//       recognition.stop();
//       synth.cancel();
//       setListening(false);
//       isRecognizingRef.current = false;
//     };
//   }, []);

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[rgba(3,3,83,0.94)] flex justify-center items-center flex-col gap-4 relative">

//       <CgMenuRight
//         className="lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
//         onClick={() => setHam(true)}
//       />

    
//       <div
//         className={`fixed top-0 right-0 w-[250px] h-full bg-[#00000090] backdrop-blur-lg p-[20px] flex flex-col gap-5 items-start transform transition-transform duration-500 ${
//           ham ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <RxCross2
//           className="text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]"
//           onClick={() => setHam(false)}
//         />
//         <button
//           type="submit"
//           className="min-w-[150px] h-10 rounded-full bg-white text-[19px] font-semibold px-2 py-1"
//           onClick={handleLogOut}
//         >
//           Logout
//         </button>
//         <button
//           type="submit"
//           className="min-w-[150px] h-10 rounded-full bg-white text-[19px] font-semibold px-2 py-1"
//           onClick={() => navigate("/customize")}
//         >
//           Customize Your Assistant
//         </button>

//         <div className="w-full h-[2px] bg-gray-400"></div>
//         <h1 className="text-white font-semibold text-[19px]">History</h1>
//         <div className="w-full gap-5 overflow-auto flex-1 overflow-y-auto flex-col ">
//           {userData.history?.map((his, key) => (
//             <p key={key} className="text-white text-[18px] overflow-hidden mt-[20px]">
//               {his}
//             </p>
//           ))}
//         </div>
//       </div>

    
//       <button
//         type="submit"
//         className="min-w-[150px] h-10 rounded-full bg-white absolute hidden md:block top-[20px] right-[20px] text-[19px] font-semibold px-2 py-1"
//         onClick={handleLogOut}
//       >
//         Logout
//       </button>
//       <button
//         type="submit"
//         className="min-w-[150px] h-10 rounded-full bg-white absolute hidden md:block top-[80px] right-[20px] text-[19px] font-semibold px-2 py-1"
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>

//       <div className="md:w-[300px] md:h-[400px] w-[200px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
//         <img src={userData?.assistantImage} className="h-full object-cover" />
//       </div>

//       <h1 className="text-white font-semibold text-lg">
//         I'm {userData.assistantName}
//       </h1>

//       {!aiText && <img src={userinput} className="w-[100px] rounded-full" />}
//       {aiText && <img src={airesponse} className="w-[100px] rounded-full" />}

//       <h1 className="text-white break-words text-wrap text-[18px] font-semibold mb-[20px]">
//         {userText ? userText : aiText ? aiText : null}
//       </h1>
//     </div>
//   );
// }

// export default Home;



import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import airesponse from "../assets/airesponse.gif";
import userinput from "../assets/userinput.gif";
import { CgMenuRight } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

function Home() {
  const navigate = useNavigate();
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);

  const synth = window.speechSynthesis;
  const [hindiVoice, setHindiVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = synth.getVoices();
      const hiVoice = voices.find((v) => v.lang === "hi-IN");
      if (hiVoice) setHindiVoice(hiVoice);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, [synth]);

  // 🚪 Logout Handler
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const safeStartRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        if (err.name !== "InvalidStateError") console.error(err);
      }
    }
  };

 
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    if (hindiVoice) utterance.voice = hindiVoice;

    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(safeStartRecognition, 1500);
    };

    synth.cancel();
    synth.speak(utterance);
  };


  const handleCommand = ({ type, userInput, response }) => {
    speak(response);
    const query = encodeURIComponent(userInput);

    const actions = {
      "google-search": () =>
        window.open(`https://www.google.com/search?q=${query}`, "_blank"),
      "calculator-open": () =>
        window.open("https://www.google.com/search?q=calculator", "_blank"),
      "instagram-open": () => window.open("https://www.instagram.com/", "_blank"),
      "facebook-open": () => window.open("https://www.facebook.com/", "_blank"),
      "weather-show": () =>
        window.open("https://www.google.com/search?q=weather", "_blank"),
      "youtube-search": () =>
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank"),
      "youtube-play": () =>
        window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank"),
    };

    actions[type?.toLowerCase()?.trim()]?.();
  };


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (!isSpeakingRef.current) setTimeout(safeStartRecognition, 1000);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition Error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted") setTimeout(safeStartRecognition, 1000);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        setAiText(data.response);
        setUserText("");
        handleCommand(data);
      }
    };

    setTimeout(safeStartRecognition, 1000);

    return () => {
      recognition.stop();
      synth.cancel();
      setListening(false);
      isRecognizingRef.current = false;
    };
  }, [userData?.assistantName, getGeminiResponse]);

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[rgba(3,3,83,0.94)] flex justify-center items-center flex-col gap-4 relative">

      <h1 className="text-gray-200 text-base m-4 p-2 font-semibold  ">Note: The Assistant Will only Respond When you call it's name</h1>
      <CgMenuRight
        className="lg:hidden text-white absolute top-5 right-5 w-6 h-6 cursor-pointer"
        onClick={() => setHam(true)}
      />

   
      <div
        className={`fixed top-0 right-0 w-full h-full bg-[#00000090] backdrop-blur-lg p-5 flex flex-col gap-5 items-start transform transition-transform duration-500 ${
          ham ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <RxCross2
          className="text-white absolute top-5 right-5 w-6 h-6 cursor-pointer"
          onClick={() => setHam(false)}
        />

    
        <button
          className="min-w-[150px] h-10 rounded-full bg-white text-lg font-semibold px-2"
          onClick={handleLogOut}
        >
          Logout
        </button>
        <button
          className="min-w-[150px] h-10 rounded-full bg-white text-lg font-semibold px-2"
          onClick={() => navigate("/customize")}
        >
          Customize Your Assistant
        </button>

        <div className="w-full h-[2px] bg-gray-400"></div>

        <h1 className="text-white font-semibold text-lg">History</h1>
        <div className="w-full flex-1 overflow-y-auto space-y-3 pr-2">
          {userData.history?.map((his, i) => (
            <p key={i} className="text-white text-base truncate">
              {his}
            </p>
          ))}
        </div>
      </div>

    
      <div className="hidden md:flex flex-col gap-3 absolute top-5 right-5">
        <button
          className="min-w-[150px] h-10 rounded-full bg-white text-lg font-semibold"
          onClick={handleLogOut}
        >
          Logout
        </button>
        <button
          className="min-w-[150px] h-10 rounded-full bg-white text-lg font-semibold"
          onClick={() => navigate("/customize")}
        >
          Customize your Assistant
        </button>
      </div>

      <div className="md:w-[300px] md:h-[400px] w-[200px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img src={userData?.assistantImage} alt="Assistant" className="h-full object-cover" />
      </div>

      <h1 className="text-white font-semibold text-lg">I'm {userData.assistantName}</h1>

      
      <img
        src={aiText ? airesponse : userinput}
        className="w-[100px] rounded-full"
        alt="Assistant response"
      />


      <h1 className="text-white text-center break-words text-lg font-semibold mb-5 max-w-[90%]">
        {userText || aiText}
      </h1>
    </div>
  );
}

export default Home;
