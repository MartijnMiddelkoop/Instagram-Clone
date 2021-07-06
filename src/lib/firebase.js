import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = { apiKey: "AIzaSyD3C6IlsWTTAuFGK_09PTH-nIYks2UO5-U",
authDomain: "instagram-9d5aa.firebaseapp.com",
projectId: "instagram-9d5aa",
storageBucket: "instagram-9d5aa.appspot.com",
messagingSenderId: "1093803188813",
appId: "1:1093803188813:web:e9b6b54e81a611f3733204"};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;



export { firebase, FieldValue };