
import SpreadSheetEntry   from './SpreadSheetEntry';
import React, { useState } from 'react';

const SpreadSheetContents = (props) => {
    let entries = props.activeSubRegions;
    const [activeIndex, setIndex] = useState(-1);
    const [editType, setEditType] = useState();
    const handleMoving = (index,type) =>{
        setIndex(index);
        setEditType(type);
    }

    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <SpreadSheetEntry
                        data={entry} key={entry._id} index={index}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        length = {props.activeSubRegions.length}
                        handleSetActive = {props.handleSetActive}
                        setRegionViewer = {props.setRegionViewer}
                        editSubRegion ={props.editSubRegion}
                        deleteSubRegion = {props.deleteSubRegion}
                        activeRegion = {props.activeRegion}
                        toggleRegionDelete = {props.toggleRegionDelete}
                        showRegionDelete = {props.showRegionDelete}
                        handleMoving = {handleMoving}
                        activeIndex = {activeIndex}
                        editType = {editType}
                        setIndex = {setIndex}
                        setEditType = {setEditType}
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                    props.activeRegion._id ? <h2 className="nothing-msg"> No Regions!</h2> : <></> 
                }               
                
            </div>
    );
};

export default SpreadSheetContents;