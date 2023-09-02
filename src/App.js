import React,{useState, useEffect} from 'react';
import { FormControl, Input } from '@mui/material';    
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase/compat/app';
import FlipMove from 'react-flip-move';                               
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

console.warn = () => {};

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

  setInput('');
  }
  console.log(input);
  console.log(messages)

  return (
    <div className="App">
      <img src="https://ww1.freelogovectors.net/wp-content/uploads/2023/03/facebook_messenger_logo-freelogovectors.net_.png?lossy=1&w=2560&ssl=1" alt="messenger logo" className="logo"/>
  <h1>Hlo India</h1>
  <h2>welcome  {username}</h2>


<form className="app__form">
<FormControl className="app__formControl">
  <Input className="app__input" placeholder="Enter a message" value ={input} onChange={event => setInput(event.target.value)} />
<IconButton className="app__iconButton" disabled={!input} variant="contained" type="submit" onClick={sendMessage}>
<SendIcon/>
</IconButton>
</FormControl>

</form>



<FlipMove>
  {
  messages.map(({id, message}) => (
    <Message key={id} username={username} message={message}/>
  ))
  }
</FlipMove>
  


    </div>
  );
}

export default App;
