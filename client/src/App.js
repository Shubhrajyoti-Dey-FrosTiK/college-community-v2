import './App.css';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { store } from './store/store.js';
import { addBug } from './actions/actions.js';
import io from 'socket.io-client';
import socketClient  from "socket.io-client";
import { useEffect,useState } from 'react'
import  Navbar from './components/navbar/Navbar.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';

function App() {
  const PORT=process.env.PORT || 3000;
  const SERVER=`http://${window.location.hostname}:${PORT}`;

  // Now we have to connect to the server (Socket IO in this case )
  var socket = socketClient(SERVER);
  // var io=new io()
  
  
  console.log(SERVER);
  useEffect(() => {
    socket.emit('message',"Client side")

    // This is a client side socket to accept any response from the server 
    socket.on('message', msg => {
      console.log(msg);
  });
    socket.on('messageRoom',message=>{
      console.log(message);
    })
    socket.on('messageTo',message=>{
      console.log(message);
    })
  });

  store.getState();

  function HandleClick() {
    var t=document.getElementById("Name").value.toString()
    var m=document.getElementById("Email").value.toString()
    var p=document.getElementById("Password").value.toString()
    var cp=document.getElementById("ConPassword").value.toString()

    store.dispatch(addBug(t+" "+m))
    
    // Get request 
    // axios.get('/api/user/',{
    //   headers:{
    //     "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNEIiwiaWF0IjoxNjMxODA3Njc3LCJleHAiOjE2MzE4OTQwNzd9.iGJ_1T_KXzcOdMXluWxYibCK3jRk3uC-dgkYLXLE5Fg",
    //     "email":m
    //   }
    // }).then(response => console.log(response));
    
    // Put request 
    // axios.put('/api/user/',{
    //     "email":m,
    //     "name":t,
    //     "password":p
    //   },{
    //     headers:{
    //       "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNEIiwiaWF0IjoxNjMxODA3Njc3LCJleHAiOjE2MzE4OTQwNzd9.iGJ_1T_KXzcOdMXluWxYibCK3jRk3uC-dgkYLXLE5Fg"
    //     }
    //   }).then(response => console.log(response));

    // Post request 
    // axios.post('/api/signup/',{
    //     "email":m,
    //     "name":t,
    //     "password":p,
    //     "conpass":cp
    //   },{
    //     headers:{
    //       "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNEIiwiaWF0IjoxNjMxODA3Njc3LCJleHAiOjE2MzE4OTQwNzd9.iGJ_1T_KXzcOdMXluWxYibCK3jRk3uC-dgkYLXLE5Fg"
    //     }
    //   }).then(response => console.log(response));
    
    // Delete request 
    // axios.delete('/api/user/',{
    //   headers:{
    //     "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlNEIiwiaWF0IjoxNjMxODA3Njc3LCJleHAiOjE2MzE4OTQwNzd9.iGJ_1T_KXzcOdMXluWxYibCK3jRk3uC-dgkYLXLE5Fg",
    //     "email":m
    //   }
    // }).then(response => console.log(response));
  

    console.log("clicked")
    socket.emit('joinRoom','Room1')
  }

  function HandleSendRoom(){
    var t=document.getElementById("Name").value.toString()
    socket.emit('messageRoom','Room1',t)
    
  }
  function HandleSendUser(){
    var t=document.getElementById("Name").value.toString()
    var m=document.getElementById("Email").value.toString()
    socket.emit('messageTo',m,t)
    
  }

  return (
    <div className="App">\
    <Router>
        <Switch>
            <Route exact path="/">
              <Navbar/>
                  <h1>Experiment App</h1>
                  <form>
                    <label>
                        Name:
                        <input type="text" id="Name" />
                      </label>
                      <br></br>
                      <label>Email
                      <input type="text" id="Email"></input>
                      </label>
                      <br></br>
                      <label>Password
                      <input type="text" id="Password"></input>
                      </label>
                      <br></br>
                      <label>Confirm Password
                      <input type="text" id="ConPassword"></input>
                      </label>
                      <br></br>
                    <Button onClick={HandleClick}>Submit</Button>
                    <Button onClick={HandleSendRoom}>Send</Button>
                    <Button onClick={HandleSendUser}>Send</Button>
                  </form>
            </Route>
            <Route exact path={'/login'}>
              <Navbar/>
              <Login/>
            </Route>
            <Route exact path={"/path2"}>
             <div>Path 2</div>
           </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
