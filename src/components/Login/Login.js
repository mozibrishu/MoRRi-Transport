import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './LoginManager';
import './Login.css'


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

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
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
                        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Name" />}
                        <br />
                        <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required />
                        <br />
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                        <br />
                        {newUser && <div><input type="password" name="confirm-password" onBlur={handleBlur} placeholder="Confirm Password" required /><br /></div>}
                        <input type="submit" value={newUser ? 'Register' : 'Log In'} />
                        {newUser ? <p>Don't have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Create Account</span> </p> :
                         <p>Already have an account? <span className="clickToChange" onClick={() => setNewUser(!newUser)}>Log In</span> </p> }

                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;