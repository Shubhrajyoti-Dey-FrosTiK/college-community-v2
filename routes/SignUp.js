import express from 'express'
import userLoginStatus from '../models/userLoginStatus.js';
import userModel from '../models/userModel.js';

const router=express.Router();

router.post("/",async (request,response) =>  {
    console.log("REQUEST RECEIVED")
    let finder=await userModel.find({
        email : request.body.email
    })
    console.log(finder._id)
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
            let req1=new userModel({
                name: request.body.name,
                email:request.body.email,
                password:request.body.password
            })
            req1.save()
            let req2=new userLoginStatus({
                email : request.body.email,
                keepLoggedIn : "False",
                loginStatus : "True"
            })
            req2.save()
            response.send({
                status: "200",
                message: "Account Created Successfully"
            })
        }
    }
})

export default router