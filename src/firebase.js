import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({    
    apiKey: "AIzaSyAVLVc4ArIJa-Ar4eENsZZE0fOWK7S1BT8",
    authDomain: "facebook-messenger-clone-38b78.firebaseapp.com",
    projectId: "facebook-messenger-clone-38b78",
    storageBucket: "facebook-messenger-clone-38b78.appspot.com",
    messagingSenderId: "883968914563",
    appId: "1:883968914563:web:6b487467568cceac1b57b6",
    measurementId: "G-530HQ92N4G"
});

const db =firebaseApp.firestore();

export default db;
