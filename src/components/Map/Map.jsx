import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Map = ({ location, zoomLevel }) => (
    <div className="map">
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

  const LocationPin = ({ text }) => (
    <div className="pin">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

  export default Map;