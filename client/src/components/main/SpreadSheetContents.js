import React        from 'react';
import SpreadSheetEntry   from './SpreadSheetEntry';

const SpreadSheetContents = (props) => {
    let entries = props.activeSubRegions;
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <SpreadSheetEntry
                        data={entry} key={entry._id} index={index}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        handleSetActive = {props.handleSetActive}
                        setRegionViewer = {props.setRegionViewer}
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