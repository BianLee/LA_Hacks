import React, { useRef, useEffect, useState } from "react";
import SignIn from "./signin"
import firebase from "./firebaseApp.js"
function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // clearInputs();
        setUser(user);
        localStorage.setItem("user", user);
        console.log(user.uid);
      } else {
        setUser("");
      }
    });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    localStorage.clear();
    localStorage.setItem("user", "");
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) {
    return (
      <><h1>Signed In</h1></>
    );
  } else {
    return (
      <>
        <SignIn/>
      </>
    )
  }
}

export default App;
