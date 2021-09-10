import { dirname } from 'path'
import { fileURLToPath } from 'url'
import  mongoose  from 'mongoose';
import postRoutes from './routes/postRoutes.js'
import express from 'express'
import cors from 'cors'
import SignUp from './routes/SignUp.js'
import Login from './routes/Login.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.use("/api/",postRoutes);
app.use("/api/signup/",SignUp);
app.use("/api/login/",Login);
// app.use(express.static(path.join(__dirname,'client','build')))

// app.use("/",(request,response) => {
//     response.sendFile(path.join(__dirname,"client","build","index.html"))
//   })
  
const CONNECTION_URL = 'mongodb+srv://experiment:experiment123@cluster0.jdiml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5050;
mongoose.connect(CONNECTION_URL)

// For heroku deployment 
if(process.env.NODE_ENV=='production'){
    app.use(express.static("/client/build/"))
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});