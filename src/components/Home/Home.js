import React, { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import Transport from '../Transport/Transport';

const Home = () => {

    const [transports, setTransports] = useState([]);

    useEffect(() => setTransports(transportData), [])
    return (
        <div className="d-flex container-fluid row align-items-center">
            {
                transports.map(transport => <Transport transport={transport}></Transport>)
            }
        </div>
    );
};

export default Home;

