import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({    
    apiKey: "AIzaSyDZdY23wmWFg7VslqyeGZI29PPfdZDOYs0",
    authDomain: "facebook-messenger-clone-8258b.firebaseapp.com",
    projectId: "facebook-messenger-clone-8258b",
    storageBucket: "facebook-messenger-clone-8258b.appspot.com",
    messagingSenderId: "572635203240",
    appId: "1:572635203240:web:7aa73faa55e5c9b37ce49d",
    measurementId: "G-2CY93G81S0"
});

const db =firebaseApp.firestore();

export default db;
