import express from 'express'
import userLoginStatus from '../models/userLoginStatus.js';
import userModel from '../models/userModel.js';
import { createRequire } from 'module';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router=express.Router();
dotenv.config();

// const expressJwt = createRequire('express-jwt');
// const config = createRequire('config.json');
// var jwt = createRequire('jsonwebtoken');
// var bcrypt = createRequire('bcryptjs');
// var config = createRequire('../config');

router.post("/",async (request,response) =>  {
    console.log("REQUEST RECEIVED")
    let finder=await userModel.find({
        email : request.body.email
    })
    if(finder.length>0){
        response.send({
            status: "402",
            message: "Email ID already exists"
        })
    }else{
        let password=request.body.password;
        if(password!=request.body.name){
            response.send({
                status: "401",
                message: "Password not matching"
            })
        }else{
            var token = jwt.sign({email:request.body.email},process.env.SECRET_KEY,{
                algorithm: "HS256"
            });
            userModel.create({
                name : request.body.name,
                email : request.body.email,
                password : request.body.password
            })
            
            userLoginStatus.create({
                email : request.body.email,
                keepLoggedIn : "False",
                loginStatus : "True",
                token : token
            })
            response.send({
                status: "200",
                token: token,
                message: "Account Created Successfully",
            })
        }
    }
})

export default router