import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import mapImage from '../../images/Map.png'

const Destination = () => {

    const [transports, setTransports] = useState([]);
    const [click, setClick] = useState(false);
    useEffect(() => setTransports(transportData), [])

    const { transportType } = useParams();
    const transport = transportData.find(tr => tr.transportType === transportType);
    return (
        <div className="d-flex container-fluid row align-items-center m-auto">
            <div className="col-11 col-md-5 col-lg-4 text-center destination m-auto">
                <div className="destination-card">
                    <label for="pickFrom" className="text-left">Pick from</label><br />
                    <input type="text" name="pickFrom"  placeholder="Pick From" required />
                    <br />
                    <label for="pickTo" className="text-left">Pick To</label><br />
                    <input type="text" name="pickTo" placeholder="Pick To" required />
                    <br />
                    <br />
                    <button>search</button>
                </div>
            </div>
            <div className="col-11 col-md-7 col-lg-5 text-center map m-auto">
                <img src={mapImage} style={{width:"80%"}} alt="" srcset=""/>
            </div>
        </div>
    );
};

export default Destination;