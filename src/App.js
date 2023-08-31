import React,{useState, useEffect} from 'react';
import { FormControl, Input } from '@mui/material';    //InputLabel,Button, no more needed so removed them
import './App.css';
import Message from './Message';
import db from './firebase';
//import firebase from 'firebase';        //this is deprecated so i used import statement with compat(in next line)
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';                               
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';


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
}, [] );


useEffect(() => {
  setUsername(prompt('please enter your name'));
},[]);


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
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Messenger_logo_2018.svg?w=100&h=100" alt="messenger logo" className="logo"/>
  <h1>Hlo India</h1>
  <h2>welcome  {username}</h2>


<form className="app__form">
<FormControl className="app__formControl">
  {/* <InputLabel >Enter a message</InputLabel> */}
  <Input className="app__input" placeholder="Enter a message" value ={input} onChange={event => setInput(event.target.value)} />
<IconButton className="app__iconButton" disabled={!input} variant="contained" type="submit" onClick={sendMessage}>
<SendIcon/>
</IconButton>
  {/* <Button disabled={!input} variant="contained" type="submit" onClick={sendMessage}>Send message</Button> */}
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
