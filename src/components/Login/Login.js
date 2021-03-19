import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword,createUserWithEmailAndPassword } from './LoginManager';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
          handleResponse(res, true);
        })
    }
  
    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }
  
    const handleResponse = (res, redirect) =>{
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
          history.replace(from);
      }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 6;
          const passwordHasNumber =  /\d{1}/.test(e.target.value);
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
        }
      }
      const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
          createUserWithEmailAndPassword(user.name, user.email, user.password)
          .then(res => {
            handleResponse(res, true);
          })
        }
    
        if(!newUser && user.email && user.password){
          signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            handleResponse(res, true);
          })
        }
        e.preventDefault();
      }

    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login;