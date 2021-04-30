import React            from 'react';
import SpreadSheetHeader      from './SpreadSheetHeader';
import SpreadSheetContents    from './SpreadSheetContents';
import { WButton, WInput, WRow, WCol, WLHeader, WLSide, WLFooter, WLayout, WLMain } from 'wt-frontend';
const SpreadSheet = (props) => {
    return (
        <div className='table centered'>
            <div>{props.activeRegion.name}</div>
            <SpreadSheetHeader
                setActiveRegion={props.setActiveRegion}
                addSubRegion={props.addSubRegion}
                goHome={props.goHome}
                activeRegion ={props.activeRegion}
            />
            <SpreadSheetContents
                key={props.activeRegion._id} activeRegion={props.activeRegion}
                activeSubRegions = { props.activeSubRegions}
                regions = {props.regions}
                handleSetActive = {props.handleSetActive}
                setRegionViewer = {props.setRegionViewer}
            />
        </div>
    );
};

export default SpreadSheet;