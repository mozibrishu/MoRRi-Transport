import React from 'react';
import './Transport.css'

const Transport = (props) => {
    const {transportType,imageURL} = props.transport;
    return (
        <div className=" col-12 col-md-6 col-lg-3 text-center transport-card-container">
            <div className="transport-card">
                <img src={imageURL} alt="" srcset=""/>
                <h2>{transportType}</h2>
            </div>
            
        </div>
    );
};

export default Transport;