import React,{useState} from 'react';
import { Button, FormControl,InputLabel, Input } from '@mui/material';
import './App.css';
import Message from './Message';


function App() {

  const[input, setInput] = useState('');
  const[messages, setMessages]= useState(["hello","hlo","bro"]);

  const sendMessage = (event) =>{ 
    event.preventDefault(); 
    // all the logic to send a message goes
    setMessages ([...messages, input]); 
    setInput('');
  }
  console.log(input);
  console.log(messages)

  return (
    <div className="App">
  <h1>Hlo India</h1>
<form>

<FormControl>
  <InputLabel >Enter a message</InputLabel>
  <Input  />
  <Button disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send message</Button>
</FormControl>

{/* <input value ={input} onChange={event => setInput(event.target.value)}/> */}
  {/* <Button disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send message</Button> */}
</form>

  {
  messages.map(message => (
    <Message text ={message}/>
   // <p>{message}</p>
  ))
  }
  
    </div>
  );
}

export default App;
