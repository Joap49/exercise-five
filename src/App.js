import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import firebase from "firebase/app"; //import everything from this package as firebase
import "firebase/auth"; //importing entire package
//Styles
import "./App.css";
//Pages
import Login from "./containers/Login";
import CreateAccount from "./containers/CreateAccount";
import UserProfile from "./containers/UserProfile";
//Components
import Header from "./components/Header";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY, // replace with .env file API reference
  authDomain: "exercise-five-9284b.firebaseapp.com",
  databaseURL: "https://exercise-five-9284b.firebaseio.com",
  projectId: "exercise-five-9284b",
  storageBucket: "exercise-five-9284b.appspot.com",
  messagingSenderId: "769600117182",
  appId: "1:769600117182:web:f41a448fb4e2d5d87c41ef",
};

function App() {
  const [loggedIn, setloggedIn] = useState(false); //determine if logged in
  const [loading, setLoading] = useState(true); //is page loading
  // const [userInformation, setUserInformation] = useState({});

  //Ensure app is initialized when its ready
  useEffect(() => {
    //initializes Firebase
    if (!firebase.apps.legnth) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  // function for logging in
  function LoginFunction(e) {
    // this is what you will run when you want to log in
    e.preventDefault();
    const email = e.currentTarget.loginEmail.value;
    const password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("LOGIN RESPONSE", response);
        setloggedIn(true);
      })
      .catch(function (error) {
        console.log("LOGIN ERROR", error);
      });
  }
  // funciton for logging out
  function LogoutFunction() {
    //function to run when you want to log otu
  }

  // function for creating an account
  function CreateAccountFunction(e) {
    // what will run when you create an account
    e.preventDefault();
    const email = e.currentTarget.createEmail.value;
    const password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATED FOR:", email, response);
        setloggedIn(true);
      })
      .catch(function (error) {
        console.log("ACCOUNT CREATION FAILED", error);
      });
  }
  console.log({ loggedIn });

  return (
    <div className="App">
      <Header loggedIn={loggedIn} LogoutFunciton={LogoutFunction} />
      <Router>
        <Route exact path="/login">
          <Login LoginFunction={LoginFunction} />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount CreateAccountFunction={CreateAccountFunction} />
        </Route>
        <Route exact path="/">
          <UserProfile />
        </Route>
      </Router>
    </div>
  );
}

export default App;
