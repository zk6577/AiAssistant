
// import geminiResponse from "../gemini.js";
// import User from "../models/user.model.js";
// import uploadOnCloudinary from "../utils/cloudinary.js";
import moment from "moment";

// export const getCurrentUser=async (req,res)=>{
// try{
// const userId=req.userId;
// const user= await User.findById(userId).select("-password")
// if(!user){
//     return res.status(404).json({message:"Unauthorized USer"});



// }

//     return res.status(200).json(user);


// }catch(error){
//     return res.status(500).json({message:"Error in the User Controller"});

// }
// }

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;

//     let assistantImage;
//     if (req.file) {
//       assistantImage = await uploadOnCloudinary(req.file.path);
//     } else {
//       assistantImage = imageUrl || null;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantName, assistantImage },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Error in the Updating Assistant" });
//   }
// };


// export const askToAssistant= async (req,res)=>{
//     try{
//         const {command}=req.body;
//     const user= await User.findById(req.userId);
//     user.history.push(command);
//     user.save()
//     const userName=user.name;
//     const assistantName=user.assistantName;
//     const result = await geminiResponse(command,assistantName,userName);

//      const jsonMatch=result.match(/{[\s\S]*}/);
//      if(!jsonMatch ){
//         return res.status(400).json({response:"sorry, I can't understand"})
//      }
//     const gemResult=JSON.parse(jsonMatch[0]);
//      const type=gemResult.type;
//      switch(type){
//         case 'get-date' :
//             return res.json({
//                 type,
//                 userInput:gemResult.userInput,
//                 response:`Current date is ${moment().format("YYYY-MM-DD")}`
//             });

//             case 'get-time':
//                     return res.json({
//                 type,
//                 userInput:gemResult.userInput,
//                 response:`Current time is ${moment().format("hh:mm A")}`
//             });

//              case 'get-day':
//                     return res.json({
//                 type,
//                 userInput:gemResult.userInput,
//                 response:`Today  is ${moment().format("dddd")}`
//             });
//                 case 'get-month':
//                     return res.json({
//                 type,
//                 userInput:gemResult.userInput,
//                 response:`Today  is ${moment().format("MMMM")}`
//             });
//            case 'google-search':
//            case 'youtube-search':
//             case 'youtube-play':
//         case 'facebook-open':
//          case 'general':
//          case 'weather-show':
//         case 'calculator-open':
//             case 'instagram-open':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userInput,
//                     response:gemResult.response
//                 });

//                 default :
//                 return  res.status(400).json({response:" I didn't understand that command"})


//      }
   

//     }catch(error){
//          console.error("askToAssistant error:", error);
//                   return  res.status(500).json({response:" Ask assistant error"})

//     }
// }
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// If using multer, make sure to import it
import multer from "multer";
const upload = multer(); // for parsing FormData text fields if no file



export const getCurrentUser=async (req,res)=>{
try{
const userId=req.userId;
const user= await User.findById(userId).select("-password")
if(!user){
    return res.status(404).json({message:"Unauthorized USer"});



}

    return res.status(200).json(user);


}catch(error){
    return res.status(500).json({message:"Error in the User Controller"});

}
}













export const updateAssistant = async (req, res) => {
  try {
    // Handle both FormData and JSON
    // If a file is uploaded, multer puts it in req.file
    // Text fields in FormData are in req.body
    const assistantName = req.body.assistantName || "";
    const imageUrl = req.body.imageUrl || null;

    if (!assistantName.trim()) {
      return res.status(400).json({ message: "Assistant name is required" });
    }

    let assistantImage = null;

    if (req.file) {
      // Upload the file to cloudinary
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else if (imageUrl) {
      // Use the URL if no file uploaded
      assistantImage = imageUrl;
    }


    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("updateAssistant error:", error);
    return res.status(500).json({ message: "Error updating assistant" });
  }
};
export const askToAssistant= async (req,res)=>{
    try{
        const {command}=req.body;
    const user= await User.findById(req.userId);
    user.history.push(command);
    user.save()
    const userName=user.name;
    const assistantName=user.assistantName;
    const result = await geminiResponse(command,assistantName,userName);

     const jsonMatch=result.match(/{[\s\S]*}/);
     if(!jsonMatch ){
        return res.status(400).json({response:"sorry, I can't understand"})
     }
    const gemResult=JSON.parse(jsonMatch[0]);
     const type=gemResult.type;
     switch(type){
        case 'get-date' :
            return res.json({
                type,
                userInput:gemResult.userInput,
                response:`Current date is ${moment().format("YYYY-MM-DD")}`
            });

            case 'get-time':
                    return res.json({
                type,
                userInput:gemResult.userInput,
                response:`Current time is ${moment().format("hh:mm A")}`
            });

             case 'get-day':
                    return res.json({
                type,
                userInput:gemResult.userInput,
                response:`Today  is ${moment().format("dddd")}`
            });
                case 'get-month':
                    return res.json({
                type,
                userInput:gemResult.userInput,
                response:`Today  is ${moment().format("MMMM")}`
            });
           case 'google-search':
           case 'youtube-search':
            case 'youtube-play':
        case 'facebook-open':
         case 'general':
         case 'weather-show':
        case 'calculator-open':
            case 'instagram-open':
                return res.json({
                    type,
                    userInput:gemResult.userInput,
                    response:gemResult.response
                });

                default :
                return  res.status(400).json({response:" I didn't understand that command"})


     }
   

    }catch(error){
         console.error("askToAssistant error:", error);
                  return  res.status(500).json({response:" Ask assistant error"})

    }
}