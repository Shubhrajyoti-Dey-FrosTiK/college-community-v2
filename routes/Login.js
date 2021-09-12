import express from 'express'
import verify from '../middlewares/verify.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import encrypt from '../encryption/encryt.js';
import decrypt from '../encryption/decrypt.js';

const router=express.Router();
dotenv.config()

router.post("/",async (request,response) =>  {
    console.log("REQUEST RECEIVED ON LOGIN")
    let isLoggedIn=false
    let finder=await userModel.find({
        email : request.body.email
    })
    for(let i=0;i<finder.length;i++){
        if(await decrypt(request.body.password,finder[i].password)){
            isLoggedIn=true;
            break
        }
    }
    if(isLoggedIn){
        var token = jwt.sign({email:request.body.email},process.env.SECRET_KEY,{
            algorithm: "HS256",
            expiresIn:86400
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