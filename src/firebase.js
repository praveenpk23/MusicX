import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage'; // Import the Storage module
import 'firebase/compat/firestore'; // Import the Firestore module
const firebaseConfig = {
    apiKey: "AIzaSyAvBEIZttxjl78AODk32kRo5Rb-jhngkiA",

    authDomain: "fir-7ca3e.firebaseapp.com",
  
    projectId: "fir-7ca3e",
  
    storageBucket: "fir-7ca3e.appspot.com",
  
    messagingSenderId: "885259052379",
  
    appId: "1:885259052379:web:c0b85a14f705447718a67e",
  
    measurementId: "G-N03FF9J3PS"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };


