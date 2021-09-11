import express from 'express'
import verify from '../middlewares/verify.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router=express.Router();
dotenv.config()

router.post("/",async (request,response) =>  {
    console.log("REQUEST RECEIVED")
    let finder=await userModel.find({
        email : request.body.email,
        password : request.body.password
    })
    console.log(finder);
    if(finder.length>0){
        var token = jwt.sign({email:request.body.email},process.env.SECRET_KEY,{
            algorithm: "HS256",
        });
        userModel.updateMany(
            {email : request.body.email},
            {
                $set: {
                    loginStatus: 'True',
                    token: token
                } 
            }
        );
        response.status(200).send({
            message: "Logged In Successfully",
            token: token
        })
    }else{
        response.status(403).send({
            message: "Invalid Credentials"
        })
    }
})

export default router