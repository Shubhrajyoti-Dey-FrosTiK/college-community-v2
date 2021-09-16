import express from 'express'
import verify from '../middlewares/verify.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import encrypt from '../encryption/encryt.js';
import decrypt from '../encryption/decrypt.js';

const router=express.Router();
dotenv.config()

router.get("/",verify,async (request,response) =>  {
    let finder=await userModel.find({
        email : request.headers.email
    })
    if(finder.length>0){
        response.status(201).send({
            message:"User found",
            data: finder
        })
    }else{
        response.send({
            status:"501",
            message:"User Not Found"
        })
    }
})

router.put("/",verify,async (request,response) =>  {
    let finder=await userModel.find({
        email : request.body.email
    })
    if(finder.length>0){
        await userModel.updateOne(
            {email : request.body.email},
            {
                $set: {
                    name: request.body.name,
                    password: request.body.password
                } 
            }
        );
        response.status(201).send({
            message:"User modified",
            data: finder
        })
    }else{
        response.send({
            status:"501",
            message:"User Not Found"
        })
    }
})

router.delete("/",verify,async (request,response) =>  {
    let finder=await userModel.find({
        email : request.headers.email
    })
    if(finder.length>0){
        await userModel.remove(
            {email : request.headers.email}
        );
        response.status(201).send({
            message:"User deleted",
            data: finder
        })
    }else{
        response.send({
            status:"501",
            message:"User Not Found"
        })
    }
})

export default router