import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import transportData from '../../data/data.json'
import mapImage from '../../images/Map.png'
import peopleIcon from '../../images/peopleicon.png'
import './Destination.css'
import { displayError, getValue, hideError } from '../Login/LoginManager';
import SearchResult from '../SearchResult/SearchResult';

const Destination = () => {

    const [transports, setTransports] = useState([]);
    const [startFrom, setStartFrom] = useState('');
    const [departureDate,setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [endTo, setEndTo] = useState('');
    const [click, setClick] = useState(false);

    useEffect(() => setTransports(transportData), [])
    const numOfResult =5;


    const handleSearchClick = () => {
        const from = getValue('pickFrom');
        const to = getValue('pickTo');
        const departureDate = getValue('departureDate');
        const departureTime = getValue('departureTime');
        if (from.length > 1 && to.length > 1) {
            setStartFrom(from);
            setEndTo(to);
            setDepartureDate(departureDate);
            setDepartureTime(departureTime);
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
                    {!click && <div className="pickFromTo">
                        <label for="pickFrom" className="text-left">Pick from</label><br />
                        <input type="text" name="pickFrom" id="pickFrom" placeholder="Pick From" />
                        <br />
                        <label for="pickTo" className="text-left">Pick To</label><br />
                        <input type="text" name="pickTo" id="pickTo" placeholder="Pick To" />
                        <br />
                        <label for="departureDate" className="text-left">Departure Date</label><br />
                        <input type="date" name="departureDate" id="departureDate"/>
                        <br />
                        <label for="departureTime" className="text-left">Departure Date</label><br />
                        <input type="time" name="departureTime" id="departureTime"/>
                        <p id="searchError" className="error mb-0 pb-0">*Enter Value.</p>
                        <br />
                        <button className="btn btn-primary mt-3" onClick={handleSearchClick}>search</button>

                    </div>}
                    {click && <div className="d-flex flex-column search-result">
                        <div>
                            <p className="pickFromToFont">Pick From:     {startFrom}</p>
                            <p className="pickFromToFont">Pick To:      {endTo}</p>
                            <div><p className="pickFromToFont">Time: {departureTime} Date: {departureDate}</p></div>
                        </div>
                        {[...Array(numOfResult)].map(() => <SearchResult transport = {transport}></SearchResult>)}
                        <SearchResult transport = {transport}></SearchResult>
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