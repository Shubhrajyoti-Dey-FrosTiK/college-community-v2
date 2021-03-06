import { dirname } from 'path'
import { fileURLToPath } from 'url'
import  mongoose  from 'mongoose';
import postRoutes from './routes/postRoutes.js'
import User from './routes/User.js'
import express from 'express'
import cors from 'cors'
import SignUp from './routes/SignUp.js'
import Login from './routes/Login.js'
import dotenv from 'dotenv'
import http from 'http'
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { createRequire } from "module";
  
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

const app=express();
dotenv.config()


/**-----------| Socket IO |--------*/
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Firstly we need to set up the connection with SocketIO 
io.on('connection', (socket) => {
    // As the socket gets connected it will show this message in the server log 
    console.log('User ID :',socket.id," connected");

    // Now we have to listen to any calls from the client side 
    socket.on('message', msg => {
        console.log(msg);

        // io.emit gives acts as a distributer which distributes
        //  the response to everyone including the sender 
        io.emit('message',"From the server")

        // io represents the whole server here 
        // socket represents an independent distributer
        // So when we do socket.broadcast.emit it goes to everyone 
        // except the sender 
        socket.broadcast.emit('Broadcast message')
    });

    socket.on('joinRoom',roomID=>{
        console.log("joined to room ",roomID);
        socket.join(roomID)
    })

    socket.on('messageRoom',(roomID,message)=>{
        console.log(socket.id ,"sent a message in ",roomID," message : ",message);

        // socket.to(<ROOM_ID>).emit(....) will send the message to everyone in the room 
        // except the sender 
        socket.to(roomID).emit('messageRoom',message)
    }) 

    socket.on('messageTo',(userID,message)=>{
        console.log(socket.id ,"sent a message in ",userID," message : ",message);

        // socket.to(<ROOM_ID>).emit(....) will send the message to everyone in the room 
        // except the sender 
        socket.to(userID).emit('messageTo',message)
    }) 
});

/**-------------\ Socket IO |----------- */


// For Swagger Docuentation 
var swaggerDocument = require('./swagger.json');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "College Community",
            description: "College Community API Documentation",
            contact: {
                name: "Shubhrajyoti Dey"
            },
            servers: ["http://localhost:5050"]
        }
    },
    // ['.routes/*.js']
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// -----------------------------

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())


/** ------------|API Routes|------------- */

app.use("/api/",postRoutes);
app.use("/api/signup/",SignUp);
app.use("/api/login/",Login);
app.use("/api/user/",User);
app.use("/api/postRoutes/",postRoutes)
// app.use(express.static(path.join(__dirname,'client','build')))

/** ------------|API Routes|------------- */


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

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});