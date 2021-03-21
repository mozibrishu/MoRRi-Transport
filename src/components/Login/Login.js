import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, getValue, hideError, displayError } from './LoginManager';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


const Login = () => {
    const [newUser, setNewUser] = useState(false);
    let [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
    });

    initializeLoginFramework();

    let [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                //checking google sign in failed Error 
                res.success ? handleResponse(res, true) : handleResponse(res, false);
            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'name') {
            let nameLength = (e.target.value).trim();
            isFieldValid = nameLength.length >= 3;
            isFieldValid ? hideError('nameError') : displayError('nameError');
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            isFieldValid ? hideError('emailError') : displayError('emailError');
        }

        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length >= 6;
            isFieldValid ? hideError('passwordError') : displayError('passwordError');
        }

        if (e.target.name === 'confirmPassword') {
            const password = getValue('password');
            isFieldValid = e.target.value === password;
            isFieldValid ? hideError('confirmPasswordError') : displayError('confirmPasswordError');
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {
        if (newUser) {
            const password = getValue('password');
            const email = getValue('email');
            const name = getValue('name');
            const confirmPassword = getValue('confirmPassword');
            // checking for directly clicked
            if ((name.length >= 3) && (password.length >= 6) && (/\S+@\S+\.\S+/.test(email)) && (password === confirmPassword)) {
                createUserWithEmailAndPassword(name, email, password)
                    .then(res => {
                        res.success ? signInWithEmailAndPassword(email, password)
                            .then(res => {
                                // If Error, Don't redirect
                                res.success ? handleResponse(res, true) : handleResponse(res, false);
                            }) : handleResponse(res, false);
                    })
            }
        }

        if (!newUser) {
            const password = getValue('password');
            const email = getValue('email');
            if ((password.length >= 6) && (/\S+@\S+\.\S+/.test(email))) {
                signInWithEmailAndPassword(email, password)
                    .then(res => {
                        res.success ? handleResponse(res, true) : handleResponse(res, false);
                    })
            }
        }
        e.preventDefault();
    }

    return (
        <div className="container-fluid row align-items-center">
            <div className="login-container col-11 col-md-9 col-lg-7 text-center my-5">
                <div className="login m-auto py-5">
                    {newUser ? <h2>Create Account</h2> : <h2>Log In</h2>}

                    <form onSubmit={handleSubmit}>
                        {newUser && <input name="name" type="text" id="name" onBlur={handleBlur} placeholder="Name" required />}
                        <p id="nameError" className="error my-0">*Name Must be at least 3 characters long.</p>
                        <br />
                        <input type="text" name="email" id="email" onBlur={handleBlur} placeholder="Email" required />
                        <p id="emailError" className="error my-0">*Email must be "something@Something.something"</p>
                        <br />
                        <input type="password" name="password" id="password" onBlur={handleBlur} placeholder="Password" required />
                        <p id="passwordError" className="error my-0">*Password Must be at least 6 characters long</p><br />
                        {newUser && <div><input type="password" id="confirmPassword" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" required /><br /></div>}
                        <p id="confirmPasswordError" className="error my-0">Password did not match</p>
                        
                        <input type="submit" value={newUser ? 'Register' : 'Log In'} />
                        <p style={{ color: 'red' }}>{user.error}</p>

                        {newUser ?
                            <p>Already have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Log In</span> </p> :
                            <p>Don't have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Create Account</span> </p>}
                    </form>
                    <hr />
                    <span>Join With <br /><br /> <span onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} className="google" /></span></span>
                </div>
            </div>
        </div>
    );
};

export default Login;