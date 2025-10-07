// import express from "express"
// import dotenv from "dotenv";
// dotenv.config();
// import connectDb from "./utils/db.js";
// import authRouter from "./routes/auth.route.js"
// import cookieParser from "cookie-parser";
//  import cors from "cors";
// import userRouter from "./routes/user.route.js";
// import geminiResponse from "./gemini.js";


// const app=express();
// app.use(cors({
//     origin:"https://aiassistant-e55v.onrender.com",
    
//     credentials:true
// }))
// const port=process.env.PORT || 5000
// app.use(express.json());
// app.use(cookieParser());
 

// app.use("/api/auth",authRouter);
// app.use("/api/user",userRouter);



// app.listen(port,()=>{
//     connectDb()
// console.log(`server is listining at ${port}`);
// });


import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./utils/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import geminiResponse from "./gemini.js";

const app = express();

const FRONTEND_URL = [
  "https://aiassistant-e55v.onrender.com", // ✅ deployed frontend
  "http://localhost:5173" // ✅ local dev (optional)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile apps, Postman, etc.
      if (FRONTEND_URL.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// ✅ routes
app.use("/api/auth", authRouter);



app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDb();
  console.log(`✅ Server running on port ${port}`);
});
