import { dirname } from 'path'
import { fileURLToPath } from 'url'
import  mongoose  from 'mongoose';
import postRoutes from './routes/postRoutes.js'
import express from 'express'
import cors from 'cors'
import SignUp from './routes/SignUp.js'
import Login from './routes/Login.js'
import dotenv from 'dotenv'
  
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();
dotenv.config()

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.use("/api/",postRoutes);
app.use("/api/signup/",SignUp);
app.use("/api/login/",Login);
app.use("/api/postRoutes/",postRoutes)
// app.use(express.static(path.join(__dirname,'client','build')))

app.use("/",(request,response) => {
//     response.sendFile(path.join(__dirname,"client","build","index.html"))
    response.send("Hello ")
})
  
const CONNECTION_URL = process.env.MONGO_CONNECTION_URL
const PORT=process.env.PORT || 5050;
mongoose.connect(CONNECTION_URL)

// For heroku deployment 
if(process.env.NODE_ENV=='production'){
    app.use(express.static("/client/build/"))
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});