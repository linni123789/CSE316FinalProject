import React, { useState }  from 'react';
import { WCol, WRow ,WLayout, WLMain, WLFooter,WLHeader} from 'wt-frontend';

const RegionViewerInfo = (props) => {

    return (
        <WLayout WLayout = "header-footer">
            <WLHeader>
            </WLHeader>
            <WLMain>
            <img className = 'flag' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png'></img>
            </WLMain>
        
        <WLFooter>

        <WCol size='6' className='region-data-titles'>
            <div>
                <span className='title'>Region Name: </span>
                <span className='region-data'>{props.name}</span>
            </div>
            <div>
                <span className='title'>Parent Region: </span>
                <span className='region-data' id="parent-region-style" onClick = {() => props.handleSetActive(props.parentRegion._id)}>{props.parentRegion.name}</span>
            </div>
            <div>
                <span className='title'>Region Capital: </span>
                <span className='region-data'>{props.capital}</span>
            </div>
            <div>
                <span className='title'>Region Leader: </span>
                <span className='region-data'>{props.leader}</span>
            </div>
            <div>
                <span className='title'># Of Sub Regions: </span>
                <span className='region-data'>{props.data.subregions.length}</span>
            </div>
        </WCol>
        </WLFooter>
        </WLayout>
    )
};

export default RegionViewerInfo;