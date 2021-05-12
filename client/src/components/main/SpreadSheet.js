import React            from 'react';
import SpreadSheetHeader      from './SpreadSheetHeader';
import SpreadSheetContents    from './SpreadSheetContents';
import { WButton, WInput, WRow, WCol, WLHeader, WLSide, WLFooter, WLayout, WLMain } from 'wt-frontend';
const SpreadSheet = (props) => {
    return (
        <div className='table'>
            <div id = "regionname">Region Name: {props.activeRegion.name}</div>
            <SpreadSheetHeader
                setActiveRegion={props.setActiveRegion}
                addSubRegion={props.addSubRegion}
                goHome={props.goHome}
                activeRegion ={props.activeRegion}
                canUndo ={props.canUndo}
                canRedo = {props.canRedo}
                undo = {props.undo}
                redo = {props.redo}
                sort = {props.sort}
            />
            <SpreadSheetContents
                key={props.activeRegion._id} activeRegion={props.activeRegion}
                activeSubRegions = { props.activeSubRegions}
                regions = {props.regions}
                handleSetActive = {props.handleSetActive}
                setRegionViewer = {props.setRegionViewer}
                editSubRegion = {props.editSubRegion}
                deleteSubRegion = {props.deleteSubRegion}
                toggleRegionDelete = {props.toggleRegionDelete}
                showRegionDelete = {props.showRegionDelete}
            />
        </div>
    );
};

export default SpreadSheet;