import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol, WLHeader, WLSide, WLFooter, WLayout, WLMain } from 'wt-frontend';

const RegionViewer = (props) => {
    const { data } = props;

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;

    // const handleNav = () => {
    //     let parent;
    //     console.log(props.regions)
    //     console.log(data.parentRegion)
    //     props.regions.forEach((region) => {
    //         if (region._id == data.parentRegion){
    //             parent = region
    //         }
    //     })
    //     if (parent != null){
    //         props.handleSetActive(parent._id);
    //     }
    // }
    return (
        <WLayout wLayout="lside">
            <WLSide>
                <WRow>
                <div>Region Name: {name}</div>
                </WRow>
                <div onClick ={() => props.handleSetActive(props.parentRegion._id)}>Region Name: {props.parentRegion.name}</div>
                <WRow>
                <div>Region Capital: {capital}</div>
                </WRow>
                <WRow>
                <div>Region Leader: {leader}</div>
                </WRow>
                <WRow>
                <div># of subRegions: {data.subregions.length}</div>
                </WRow>
            </WLSide>
            <WLMain>
                Region Landmarks
            </WLMain>
        </WLayout>
    );
};
export default RegionViewer;