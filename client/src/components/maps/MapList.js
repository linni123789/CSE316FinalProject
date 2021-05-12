import React        from 'react';
import MapEntry from './MapEntry';

const MapList = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.maps &&
                props.maps.reverse().map(entry => (
                    <MapEntry
                        key={entry._id}
                        name={entry.name} _id={entry._id}
                        deleteMap = {props.deleteMap}
                        updateMapName = {props.updateMapName}
                        handleSetActive = {props.handleSetActive}
                        setShowDelete = {props.setShowDelete}
                        showDelete = {props.showDelete}
                    />
                ))
            }
        </>
    );
};

export default MapList;