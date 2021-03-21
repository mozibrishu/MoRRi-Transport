import React, { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import Transport from '../Transport/Transport';

const Home = () => {

    const [transports, setTransports] = useState([]);

    useEffect(() => setTransports(transportData), [])
    return (
        <div className="d-flex container justify-content-around row align-items-center mx-auto mt-5 w-100">
            {
                transports.map(transport => <Transport transport={transport}></Transport>)
            }
        </div>
    );
};

export default Home;

