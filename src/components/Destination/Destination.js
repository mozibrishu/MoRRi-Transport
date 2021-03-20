import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import mapImage from '../../images/Map.png'
import peopleIcon from '../../images/peopleicon.png'
import './Destination.css'

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
                    <input type="text" name="pickFrom" placeholder="Pick From" />
                    <br />
                    <label for="pickTo" className="text-left">Pick To</label><br />
                    <input type="text" name="pickTo" placeholder="Pick To" />
                    <br />
                    <br />
                    
                    {!click && <button onClick={() => setClick(!click)}>search</button>}
                    {click && <div className="d-flex flex-column">
                        <div className="searchResult">
                            <img className="mx-4 smallImage" src={transport.imageURL} alt="" srcset="" />
                            <span>{transportType}</span>
                            <img className="mx-2 smallIcon" src={peopleIcon} alt="" srcset="" />
                            <span>{transport.numOfPerson}</span>
                            <span className="mx-5">${transport.fare}</span>
                        </div>
                        <div className="searchResult">
                            <img className="mx-4 smallImage" src={transport.imageURL} alt="" srcset="" />
                            <span>{transportType}</span>
                            <img className="mx-2 smallIcon" src={peopleIcon} alt="" srcset="" />
                            <span>{transport.numOfPerson}</span>
                            <span className="mx-5">${transport.fare}</span>
                        </div>
                        <div className="searchResult">
                            <img className="mx-4 smallImage" src={transport.imageURL} alt="" srcset="" />
                            <span>{transportType}</span>
                            <img className="mx-2 smallIcon" src={peopleIcon} alt="" srcset="" />
                            <span>{transport.numOfPerson}</span>
                            <span className="mx-5">${transport.fare}</span>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="col-11 col-md-7 col-lg-5 text-center map m-auto">
                <img src={mapImage} style={{ width: "80%" }} alt="" srcset="" />
            </div>
        </div>
    );
};

export default Destination;