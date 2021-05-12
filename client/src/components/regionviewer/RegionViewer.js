import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol, WLHeader, WLSide, WLFooter, WLayout, WLMain } from 'wt-frontend';
import LandmarkEntry from './LandmarkEntry';
import RegionViewerInfo from './RegionViewerInfo'
import RegionViewerTable from './RegionViewerTable'

const RegionViewer = (props) => {
    const { data } = props;

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;
    const clickDisabled = () => { };

    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted",  
        ///clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light", 
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        // clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    let parentRegion;
    props.regions.forEach((region) =>{
        if (region._id == data.parentRegion){
            parentRegion = region;
        }
    })
    
    // const handleAddLandmark = () => {
    //     props.addLandmark(data._id,document.getElementById("landmarkinput").value, data.landmarks.length);
    // }

    return (
        <WRow>
            <WCol size = "6">
            <WLMain>
                <RegionViewerInfo
                    name = {name}
                    capital = {capital}
                    leader = {leader}
                    landmarks = {landmarks}
                    parentRegion = {parentRegion}
                    data = {data}
                    handleSetActive = {props.handleSetActive}
                />
            </WLMain>
            </WCol>
            <WCol size = "6">
            <WLSide>
                <RegionViewerTable
                    landmarks = {landmarks}
                    _id = {data._id}
                    deleteLandmark = {props.deleteLandmark}
                    updateLandmark = {props.updateLandmark}
                    undoOptions = {undoOptions}
                    redoOptions = {redoOptions}
                    data = {data}
                    regions = {props.regions}
                    addLandmark = {props.addLandmark}
                    changeParent=  {props.changeParent}
                />
            </WLSide>
            </WCol>
        </WRow>

        // <div className='region-viewer'>
        //     <WRow>
        //         <WCol size='4'>
        //             <img className = 'flag' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png'></img>
        //         </WCol>
        //         <WCol size='6'>
        //             <WCol>
        //             <WButton {...undoOptions}>
        //                             <i className="material-icons">undo</i>
        //                     </WButton>
        //                     <WButton  {...redoOptions}>
        //                             <i className="material-icons">redo</i>
        //             </WButton>
        //             </WCol>
        //             <h1>Region Landmarks: </h1>
        //             {landmarks.map((entry, index) => (
        //                 <LandmarkEntry
        //                     name = {entry}
        //                     _id = {data._id}
        //                     index = {index}
        //                     deleteLandmark = {props.deleteLandmark}
        //                     updateLandmark = {props.updateLandmark}
        //                 />
        //             ))
        //             }
        //             <WInput id= "landmarkinput" type = "text"></WInput>
        //             <WButton id = "addlandmark" onClick = {handleAddLandmark} wType="texted"  clickAnimation={"ripple-light" }>
        //                 <i className="material-icons">add_box</i>
        //             </WButton>
        //         </WCol>
        //     </WRow>
        // </div>
    );
};
export default RegionViewer;