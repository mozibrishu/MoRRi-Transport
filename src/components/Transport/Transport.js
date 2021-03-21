import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css'

const Transport = (props) => {
    const { transportType, imageURL } = props.transport;
    return (
        <div className=" col-12 col-md-6 col-lg-3 mt-3 text-center transport-card-container">
            <Link to={`/destination/${transportType}`}>
                <div className="transport-card">
                    <img className="transportImage" src={imageURL} alt="" srcset="" />
                    <h2>{transportType}</h2>
                </div>
            </Link>
        </div>
    );
};

export default Transport;