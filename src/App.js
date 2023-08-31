import React,{useState, useEffect} from 'react';
import { Button, FormControl,InputLabel, Input } from '@mui/material';
import './App.css';
import Message from './Message';
import db from './firebase';
//import firebase from 'firebase';        //this is deprecated so i used import statement with compat(in nextline)
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';                               

function App() {

  const[input, setInput] = useState('');
  const[messages, setMessages]= useState([]);
  const[username, setUsername] = useState('');

//useState =variable in React
//useEffect = run code on a condition in React 

useEffect(() =>  {
  db.collection("messages")
  .orderBy("timestamp","desc")
  .onSnapshot(snapshot =>{
setMessages(snapshot.docs.map(doc=>({id: doc.id, message: doc.data()})))  

  });
}, [] )


useEffect(() => {
  setUsername(prompt('please enter your name'));
},[])


  const sendMessage = (event) =>{ 
    event.preventDefault(); 
    db.collection("messages").add({
      message:input,
      username: username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    // all the logic to send a message goes
    // setMessages ([...messages, {username: username, message: input}
    // ]); 
     setInput('');
  }
  console.log(input);
  console.log(messages)

  return (
    <div className="App">
  <h1>Hlo India</h1>
  <h2>welcome  {username}</h2>

<form>
<FormControl>
  <InputLabel >Enter a message</InputLabel>
  <Input  value ={input} onChange={event => setInput(event.target.value)} />
  <Button disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send message</Button>
</FormControl>

{/* <input value ={input} onChange={event => setInput(event.target.value)}/> */}
  {/* <Button disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send message</Button> */}
</form>
<FlipMove>
  {
  messages.map(({id, message}) => (
    <Message key={id} username={username} message={message}/>
   // <p>{message}</p>
  ))
  }
</FlipMove>
  
    </div>
  );
}

export default App;
