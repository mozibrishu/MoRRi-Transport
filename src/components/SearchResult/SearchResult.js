import React from 'react';
import peopleIcon from '../../images/peopleicon.png'

const SearchResult = (props) => {
    const {imageURL,transportType,numOfPerson,fare} = props.transport;
    return (
        <div className="searchResult">
                            <img className="mx-4 smallImage" src={imageURL} alt="" srcset="" />
                            <span>{transportType}</span>
                            <img className="mx-2 smallIcon" src={peopleIcon} alt="" srcset="" />
                            <span>{numOfPerson}</span>
                            <span className="mx-5">${fare}</span>
                        </div>
    );
};

export default SearchResult;