import './App.css';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { store } from './store/store.js';
import { addBug } from './actions/actions.js';


function App() {

  store.getState();

  function HandleClick() {
    var t=document.getElementById("Name").value.toString()
    var m=document.getElementById("Email").value.toString()
    var p=document.getElementById("Password").value.toString()

    store.dispatch(addBug(t+" "+m))

    console.log(t);
    const requestOptions = {
        name: t,
        email: m,
        password: p
  };
    var res=[];
    axios.post('/api/signup/',requestOptions).then(function (response) {
      console.log(response)
      res.status=response.data.status.toString()
      res.message=response.data.message.toString()
    })
    console.log(res);
  }

  return (
    <div className="App">
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
         <Button onClick={HandleClick}>Submit</Button>
      </form>
    </div>
  );
}

export default App;
