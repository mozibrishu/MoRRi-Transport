import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import mapImage from '../../images/Map.png'
import peopleIcon from '../../images/peopleicon.png'
import './Destination.css'
import { displayError, getValue, hideError } from '../Login/LoginManager';

const Destination = () => {

    const [transports, setTransports] = useState([]);
    const [startFrom, setStartFrom] = useState('');
    const [endTo, setEndTo] = useState('');
    const [click, setClick] = useState(false);
    useEffect(() => setTransports(transportData), [])


    const handleSearchClick = () => {
        const from = getValue('pickFrom');
        const to = getValue('pickTo');
        if (from.length > 1 && to.length > 1) {
            setStartFrom(from);
            setEndTo(to);
            setClick(!click);
            hideError("searchError");
        } else {
            displayError("searchError");
        }
    }

    const { transportType } = useParams();
    const transport = transportData.find(tr => tr.transportType === transportType);
    return (
        <div className="d-flex container-fluid row m-auto pt-5">
            <div className="col-11 col-md-4 col-lg-4 text-center destination m-auto">
                <div className="destination-card">
                    {!click && <div>
                        <label for="pickFrom" className="text-left">Pick from</label><br />
                        <input type="text" name="pickFrom" id="pickFrom" placeholder="Pick From" />
                        <br />
                        <label for="pickTo" className="text-left">Pick To</label><br />
                        <input type="text" name="pickTo" id="pickTo" placeholder="Pick To" />
                        <br />
                        <p id="searchError" className="error">*Enter Value.</p>
                        <br />
                        <button onClick={handleSearchClick}>search</button>

                    </div>}
                    {click && <div className="d-flex flex-column">
                        <div>
                            <p>Pick From: {startFrom}</p>
                            <p>Pick To: {endTo}</p>
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
            <div className="col-11 col-md-8 col-lg-5 text-center map m-auto">
                <img src={mapImage} style={{ width: "80%" }} alt="" srcset="" />
            </div>
        </div>
    );
};

export default Destination;