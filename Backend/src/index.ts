import express, { Request, Response }  from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./Routes/Users";
import authRoutes from "./Routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app= express();
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))



// app.get("/api/test",async(req : Request, res : Response) => {
//     res.json({ message : "hello world"});
// })
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
// app.use("/api/users", userRoutes)

app.listen(7000,()=>{
    console.log("Server reunning on 7000");
})