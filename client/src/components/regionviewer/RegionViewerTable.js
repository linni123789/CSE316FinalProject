
import React, { useState }  from 'react';
import { WLayout, WLMain, WLFooter, WLHeader, WInput, WButton, WCol, WRow } from 'wt-frontend';
import LandmarkEntry from './LandmarkEntry'
const RegionViewerTable = (props) => {

    const handleAddLandmark = () => {
        if (document.getElementById("landmarkinput").value != ""){
            props.addLandmark(props.data._id,document.getElementById("landmarkinput").value, props.data.landmarks.length);
            document.getElementById('landmarkinput').value = ''
        }
    }

    const handleChangeParent =  () => {
        if (document.getElementById("changeparentinput").value != ""){
            props.changeParent(props.data._id,document.getElementById("changeparentinput").value);
            document.getElementById('changeparentinput').value = ''
        }
    }

    let currentRegion = props.data
    let alllandmarks=[]
    let regions = props.regions;

    const regionTraversal = (currentRegion) => {
        if(currentRegion.subregions.length===0)
            return
        currentRegion.subregions.forEach(x=>{
            regions.forEach(y=>{
                if (y._id===x){
                    y.landmarks.forEach(z=>
                        alllandmarks.push(z+"-"+y.name))
                    regionTraversal(y)
                }
                })
        })
    }
    regionTraversal(currentRegion);

    return (
        <WLayout Wlayout = "header-footer" id ="regiontable">
            <WLHeader>
                <WRow>
                <WCol size='6'>
                    <WButton {...props.undoOptions}>
                                    <i className="material-icons">undo</i>
                    </WButton>
                    <WButton  {...props.redoOptions}>
                                    <i className="material-icons">redo</i>
                    </WButton>
                </WCol>
                </WRow>
            </WLHeader>
            <WLMain>

            <h1>Region Landmarks: </h1>             
            {props.landmarks.map((entry, index) => (
                <LandmarkEntry
                    current = {true}
                    name = {entry}
                    _id = {props.data._id}
                    index = {index}
                    deleteLandmark = {props.deleteLandmark}
                    updateLandmark = {props.updateLandmark}
                />
            ))
            }
            {alllandmarks.map((entry,index) =>(
                <LandmarkEntry
                    current = {false}
                    name = {entry}
                    _id = {props.data._id}
                    index = {index}
                    deleteLandmark = {props.deleteLandmark}
                    updateLandmark = {props.updateLandmark}
                />
            ))}
            </WLMain>
            <WLFooter>
                <WRow>
                    <WCol size = "5">
                        <WInput id= "landmarkinput" type = "text"></WInput>
                    </WCol>
                    <WCol size = "1">
                        <WButton id = "addlandmark" onClick = {handleAddLandmark} wType="texted"  clickAnimation={"ripple-light" }>
                            <i className="material-icons">add_box</i>
                        </WButton>
                    </WCol>
                </WRow>
                <WRow>
                    <WCol size = "5">
                        <WInput id= "changeparentinput" type = "text"></WInput>
                    </WCol>
                    <WCol size = "1">
                        <WButton id = "changeparent" onClick = {handleChangeParent} wType="texted"  clickAnimation={"ripple-light" }>
                            <i className="material-icons">done</i>
                        </WButton>
                    </WCol>
                </WRow>
            </WLFooter>
        </WLayout>
    );
};

export default RegionViewerTable;