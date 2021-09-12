import express, { request, response } from 'express'
import mongoose from 'mongoose'
import postMessage from '../models/postMessage.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verify from '../middlewares/verify.js'

const router=express.Router();

router.post("/",verify,async (request,response) =>  {
    // console.log("WOrking");
    response.send({
        status: "200",
        message : "Authenticated"
    })
})

export default router