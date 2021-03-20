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
                {loggedInUser.email && <Link to="/home">{loggedInUser.displayName}</Link>}
                {loggedInUser.email ? <button onClick={() => setLoggedInUser({})}>Sign out</button> :
                    <Link to="/login"><button>Login</button></Link>}
                
            </nav>
        </div>
    );
};

export default Header;