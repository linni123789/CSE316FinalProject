import React            from 'react';
import MapHeader    from './MapHeader';
import MapList      from './MapList';
import { WButton, WInput, WRow, WCol }  from 'wt-frontend';
import { useState } 				from 'react';
const MapContents = (props) => {
    const [addMap, toggleaddMap] = useState(false);
    const handleaddMap = (e) => {;
        toggleaddMap(!addMap);  
        if (e.target.value != ""){
            props.addMap(e.target.value);
            props.reloadRegions();
        }
    };
    return (
        <div className = 'maps'>
        <MapHeader auth={props.auth} createNewList={props.createNewList} activeid={props.activeid} />
            <WRow>
                <WCol size = '6'>
                    <MapList
                        maps = {props.maps}
                        deleteMap = {props.deleteMap}
                        updateMapName = {props.updateMapName}
                        handleSetActive = {props.handleSetActive}
                        setShowDelete = {props.setShowDelete}
                        showDelete = {props.showDelete}
                    />
                </WCol>
                <WCol size = '6'>
                    <img src = 'https://media.istockphoto.com/photos/earth-picture-id1128667076?k=6&m=1128667076&s=612x612&w=0&h=sobgNl_vFyW8wr4NavT3cKlmwnEoluMGRfOPieMW5hg='></img>
                </WCol>
            </WRow>
            <WButton color="colored" hoverAnimation="lighten" clickAnimation="ripple-light" onClick={()=> toggleaddMap(!addMap)}> Add Map
            </WButton>
            {
                addMap ? 
                <WInput className={'addMapinput'} autoFocus={true} onBlur={handleaddMap} />
                :
                <div>
                </div>
            
            }

        </div>
    );
};

export default MapContents;