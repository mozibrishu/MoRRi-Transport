import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import './NavBar.css'

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to="/home" className="navbar-brand mx-3">Logo</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link to="/home" className="mx-3 nav-link">MoRRi Transport</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home" className="mx-3 text-dark nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/destination/bike" className="mx-3 text-dark nav-link">Destination</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    {loggedInUser.email && <Link to="/home" className="mx-3 text-dark nav-link">{loggedInUser.displayName}</Link>}
                    {loggedInUser.email ? <span onClick={() => setLoggedInUser({})} className="mx-3 text-dark nav-link">Sign out</span> :
                        <Link to="/login" className="mx-3 text-dark nav-link">Login</Link>}
                </form>
            </div>
            </div>
        </nav>
    );
};

export default NavBar;