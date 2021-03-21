import React, { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import Transport from '../Transport/Transport';
import './Home.css'

const Home = () => {

    const [transports, setTransports] = useState([]);

    useEffect(() => setTransports(transportData), [])
    return (
        <div className="home-container pt-5">
            <div className="d-flex container justify-content-around row align-items-center mx-auto w-100">
            {
                transports.map(transport => <Transport transport={transport}></Transport>)
            }
        </div>
        </div>
    );
};

export default Home;

