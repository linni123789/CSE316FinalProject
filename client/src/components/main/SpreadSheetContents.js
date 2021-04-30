import React        from 'react';
import SpreadSheetEntry   from './SpreadSheetEntry';

const SpreadSheetContents = (props) => {
    let entries = [];
    let subregionsID = props.activeRegion.subregions;
    console.log(subregionsID)
    if (subregionsID !== undefined){
        subregionsID.forEach((subregionID) => {
            props.regions.forEach((region) =>{
                if (subregionID === region._id)
                    entries.push(region)
            })
        }
        )
    }
    console.log(entries);
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <SpreadSheetEntry
                        data={entry} key={entry._id} index={index}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        handleSetActive = {props.handleSetActive}
                        setRegionViewer
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                    props.activeRegion._id ? <h2 className="nothing-msg"> Nothing to do!</h2> : <></> 
                }               
                
            </div>
    );
};

export default SpreadSheetContents;