import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol, WLHeader, WLSide, WLFooter, WLayout, WLMain } from 'wt-frontend';
import LandmarkEntry from './LandmarkEntry';

const RegionViewer = (props) => {
    const { data } = props;

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;
    let parentRegion;
    props.regions.forEach((region) =>{
        if (region._id == data.parentRegion){
            parentRegion = region;
        }
    })
    
    const handleAddLandmark = () => {
        props.addLandmark(data._id,document.getElementById("landmarkinput").value);
    }

    return (
        <div className='region-viewer'>
            <WRow>
                <WCol size='6'>
                    <img className = 'flag' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png'></img>
                </WCol>
                <WCol size='6'>
                    <h1>Region Landmarks: </h1>
                    {landmarks.map((entry, index) => (
                        <LandmarkEntry
                            name = {entry}
                            _id = {data._id}
                            index = {index}
                            deleteLandmark = {props.deleteLandmark}
                            updateLandmark = {props.updateLandmark}
                            

                        />
                    ))
                    }
                    <WInput id= "landmarkinput" type = "text"></WInput>
                    <WButton id = "addlandmark" onClick = {handleAddLandmark} wType="texted"  clickAnimation={"ripple-light" }>
                        <i className="material-icons">add_box</i>
                    </WButton>
                </WCol>
            </WRow>
            <WRow>
                <WCol size='6' className='region-data-titles'>
                    <div>
                        <span className='title'>Region Name: </span>
                        <span className='region-data'>{name}</span>
                    </div>
                    <div>
                        <span className='title'>Parent Region: </span>
                        <span className='region-data' id="parent-region-style" onClick = {() => props.handleSetActive(parentRegion._id)}>{parentRegion.name}</span>
                    </div>
                    <div>
                        <span className='title'>Region Capital: </span>
                        <span className='region-data'>{capital}</span>
                    </div>
                    <div>
                        <span className='title'>Region Leader: </span>
                        <span className='region-data'>{leader}</span>
                    </div>
                    <div>
                        <span className='title'># Of Sub Regions: </span>
                        <span className='region-data'>{data.subregions.length}</span>
                    </div>
                </WCol>
                <WCol size='6'>

                </WCol>
            </WRow>
        </div>
    );
};
export default RegionViewer;