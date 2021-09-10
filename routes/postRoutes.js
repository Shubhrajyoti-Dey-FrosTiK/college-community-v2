import express, { request, response } from 'express'
import mongoose from 'mongoose'
import postMessage from '../models/postMessage.js'

const router=express.Router();

router.post("/",async (request,response) =>  {
    console.log(request.body)
    console.log("REQUEST RECEIVED");
    let msg = new postMessage({
        title: request.body.status,
        message: request.body.message
      })
    try {
        msg.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
    } catch (error) {
        console.log("Duplicate Exists")
    }
    
    let temp=await postMessage.find({})
    response.send({
            message: "Request Received successfully",
            status: "OK",
            db: temp
    })
})

export default router