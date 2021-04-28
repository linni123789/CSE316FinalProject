import React            from 'react';
import MapHeader    from './MapHeader';
import MapList      from './MapList';
import { WButton, WInput, WRow, WCol }  from 'wt-frontend';
import { useState } 				from 'react';
const MapContents = (props) => {
    const [addMap, toggleaddMap] = useState(false);
    const handleaddMap = (e) => {;
        toggleaddMap(!addMap);
        props.addMap(e.target.value);
    };
    return (
        <div>
        MAPS ARE HERE
        <WButton className={` sidebar-buttons`} onClick={()=> toggleaddMap(!addMap)}>
                            <i className="material-icons">add</i>
        </WButton>
        {
            addMap ? 
            <WInput autoFocus={true} onBlur={handleaddMap} />
            :
            <div>
            </div>
        
        }
        </div>
        
        // <>
        //     <MapHeader 
        //         auth={props.auth} createNewList={props.createNewList} activeid={props.activeid}
        //     />
        //     <MapList
        //         activeid={props.activeid} handleSetActive={props.handleSetActive}
        //         listIDs={props.listIDs} createNewList={props.createNewList}
        //         updateListField={props.updateListField}
        //     />
        // </>
    );
};

export default MapContents;