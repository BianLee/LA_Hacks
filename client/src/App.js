import React, { useRef, useEffect, useState } from "react";
import SignIn from "./signin"
import firebase from "./firebaseApp.js"
import Playground from "./playground.js"

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
    const [userId, setUserId] = useState("");
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // clearInputs();
        setUser(user);
        localStorage.setItem("user", user);
        setUserId(user.uid);
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
<>
      <div className="my-5 mx-1">
      <p>User: {userId}</p>
   <button class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Log Out</button>

      </div>
      <Playground/> 
    </>
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
