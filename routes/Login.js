import express from 'express'
import userModel from '../models/userModel.js';

const router=express.Router();

router.post("/",async (request,response) =>  {
    console.log("REQUEST RECEIVED")
    console.dir(request.body)
    let finder=await userModel.find({
        email : request.body.email,
        password : request.body.password
    })
    console.log(finder);
    if(finder.length>0){
        userModel.updateMany(
            {email : request.body.email},
            {
                $set: {
                    loginStatus: 'True' 
                } 
            }
        );
        response.send({
            status: "200",
            message: "Logged In Successfully"
        })
    }else{
        response.send({
            status: "403",
            message: "Invalid Credentials"
        })
    }
})

export default router