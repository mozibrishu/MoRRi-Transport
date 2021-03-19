import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/destination/bike">Destination</Link>
                <Link to="/login">Login</Link>
                <button onClick={() => setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;