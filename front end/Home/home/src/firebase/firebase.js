import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBpcMBr173NsPz2vrWMfzWOqWIUftvmY_w",
    authDomain: "takecare-47421.firebaseapp.com",
    databaseURL: "https://takecare-47421.firebaseio.com",
    projectId: "takecare-47421",
    storageBucket: "takecare-47421.appspot.com",
    messagingSenderId: "737092231480",
    appId: "1:737092231480:web:bd17a27767f54cbdf0a1cd",
    measurementId: "G-SBK569XW78"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()
  export  {
    storage, firebase as default
  }
