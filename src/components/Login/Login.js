import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './LoginManager';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const setValue = (id,value) => {
        document.getElementById(id).value = value;
    }
    const getValue = (id) => {
        const value = document.getElementById(`${id}`).value;
        return value;
    }

    const displayError = id => { document.getElementById(`${id}`).style.display = 'block'}
    const hideError = id => { document.getElementById(`${id}`).style.display = 'none'}
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'name') {
            let nameLength = (e.target.value).trim();
            isFieldValid = nameLength.length >= 3;
            if(isFieldValid) {
                hideError('nameError');
            }else {
                displayError('nameError');
            }
            console.log(isFieldValid);
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            if(isFieldValid) {
                hideError('emailError');
            }else {
                displayError('emailError');
            }
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length >= 6;
            if(isFieldValid) {
                hideError('passwordError');
            }else {
                displayError('passwordError');
            }
            
        }
        if (e.target.name === 'confirmPassword') {
            const password = getValue('password');
            isFieldValid = e.target.value === password;
            if(isFieldValid) {
                hideError('confirmPasswordError');
            }else {
                displayError('confirmPasswordError');
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    return (
        <div className="container-fluid row align-items-center">
            <div className="login-container col-11 col-md-9 col-lg-7 text-center">
                <div className="login">
                    {newUser ? <h2>Create Account</h2> : <h2>Log In</h2> }
                    <form onSubmit={handleSubmit}>
                        {newUser && <input name="name" type="text" id="name" onBlur={handleBlur} placeholder="Name" required />}
                        <p id="nameError" className="error">*Name Must be at least 3 characters long.</p>
                        <br />
                        <input type="text" name="email" id="email" onBlur={handleBlur} placeholder="Email" required />
                        <p id="emailError" className="error">*Email must be "something@Something.something"</p>
                        <br />
                        <input type="password" name="password" id="password" onBlur={handleBlur} placeholder="Password" required />
                        <p id="passwordError" className="error">*Password Must be at least 6 characters long</p><br />
                        {newUser && <div><input type="password" id="confirmPassword" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" required /><br /></div>}
                        <p id="confirmPasswordError" className="error">Password did not match</p>
                        <input type="submit" value={newUser ? 'Register' : 'Log In'} />
                        {newUser ? 
                         <p>Already have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Log In</span> </p> :
                         <p>Don't have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Create Account</span> </p> }

                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
                </div>
                <hr/>
                <span onClick={googleSignIn}>Join With <br/><br/> <button> <FontAwesomeIcon icon={faGoogle} className="google" /></button></span>
            </div>
        </div>
    );
};

export default Login;