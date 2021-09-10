import express, { request, response } from 'express'

const router=express.Router();

router.get("/",(request,response) => {
    response.render("/Users/shubhrajyotidey/Desktop/Web_Development/React/Experiment/server/client/public/index.html")
});

export default router;