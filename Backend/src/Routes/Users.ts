import express, {Request ,Response} from "express";
import { check as expressCheck, validationResult as expressValidationResult } from "express-validator";
import User from "../models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";


const router= express.Router();


// /api/users/register
router.post("/register", [
    expressCheck("firstName", "First name is required").isString(),
    expressCheck("lastName", "Last name is required").isString(),
    expressCheck("email", "Email name is required").isEmail(),
    expressCheck("password", "password with 6 or more characters required").isLength({min:6 ,}),

],async( req : Request, res : Response) =>{

    const errors= expressValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
    try {

        let user= await User.findOne({
            email: req.body.email,
        })

        if(user){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
        
        
       const  user1 = new User(req.body)
        
        await user1.save();

        
        const token = jwt.sign({userId : user1.id}, process.env.JWT_SECRET_KEY as string , {expiresIn:"1d"}) 

        res.cookie("auth_token", token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === "producation",
            maxAge: 86400000,
        })

        return res.status(200).send({message: "Somthing went to wrong"});
    } catch (error) {
        console.log(error);

        res.status(500).send({message: "Somthing went to wrong"})
    }
})

export default router;

