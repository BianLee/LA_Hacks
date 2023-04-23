import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD23dyJMLl26URdx11DPrHR92L8EYIP3II",
    authDomain: "lahacks-ec0fd.firebaseapp.com",
    projectId: "lahacks-ec0fd",
    storageBucket: "lahacks-ec0fd.appspot.com",
    messagingSenderId: "375867522299",
    appId: "1:375867522299:web:aac529ba75f1eeb8c6845e",
    measurementId: "G-7RKZYLZFHW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
