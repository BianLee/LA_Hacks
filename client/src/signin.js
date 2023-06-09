import React, { useState } from 'react';
import firebaseApp from './firebaseApp';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from "axios"

const SignIn = () => {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTwo, setEmailTwo] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const options=["SignUp", "SignIn"]
  const [selectedOption, setSelectedOption] = useState(options[0].value);


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignUp = async (e) => {
    setEmailError("");
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(emailTwo, passwordTwo)
      .then(function (data) {
        console.log("uid", data.user.uid);
        /* 
        firebase
          .database()
          .ref("users/" + data.user.uid)singio
          .set({
            id: data.user.uid,
            email: email,
          });
        */ 
       const userPost = {
        uid: data.user.uid,
        email: emailTwo, 
      }; 
      console.log(userPost);
      axios
        .post("http://localhost:8080/api/postUser", userPost)
        .then(
          (res) => console.log("page update?")
        )
        .catch((error) => {
          console.log(error)
        })
      })
      
      .catch((err) => {
        console.log("error occured");
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError("Invalid email");
            break;
          case "auth/weak-password":
            setPasswordError("Weak password");
            break;
        }
      });
      
  };

  return (
    <div>
    <center>
     <div className="w-1/4">
        <select
          className="w-full p-2 border-2 rounded-lg"
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}>
        
          <option key="SignUp" value="SignUp">Sign Up</option>
          <option key="SignIn" value="SignIn">Sign In</option>
        </select>
        </div>
        {selectedOption == "SignIn" ? <>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight" placeholder="Email"/>
          <br/>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 my-2 text-gray-700 leading-tight" placeholder="Password"/>
          <br/><button type="submit" onClick={handleSignIn}>Sign In</button>

        </> : <>
        <input type="text" value={emailTwo} onChange={(e) => setEmailTwo(e.target.value)}  class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 text-gray-700 leading-tight" placeholder="Email"/>
          <br/>
          <input type="text" value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} type="password" class="bg-gray-200 mx-1 appearance-none border-2 border-gray-200 rounded w-1/3 py-2 px-4 my-2 text-gray-700 leading-tight" placeholder="Password"/>
          <br/><button type="submit" onClick={handleSignUp}>Sign Up</button>
        </>}



        


       

      </center>
    </div>
  );
};

export default SignIn;
