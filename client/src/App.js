import './App.css';
import {Button} from 'react-bootstrap'
import axios from 'axios'
import { store } from './store/store.js';
import { addBug } from './actions/actions.js';


function App() {

  store.getState();

  function HandleClick() {
    var t=document.getElementById("Title").value.toString()
    var m=document.getElementById("Message").value.toString()

    store.dispatch(addBug(t+" "+m))

    console.log(t);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: t,
        message: m
      })
  };
    var res=[];
    axios.post('/api/',{
      status: t,
      message: m
    }).then(function (response) {
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
            Title:
            <input type="text" id="Title" />
          </label>
          <br></br>
          <label>Message
          <input type="text" id="Message"></input>
          </label>
          <br></br>
         <Button onClick={HandleClick}>Submit</Button>
      </form>
    </div>
  );
}

export default App;
