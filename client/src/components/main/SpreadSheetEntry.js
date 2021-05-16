import React, { useState, useEffect} from 'react';
import { WCol, WRow, WNavItem, WInput, WModal, WMHeader, WMMain, WButton  } from 'wt-frontend';


const SpreadSheetEntry = (props) => {
    const { data } = props;
    var timer = 0;
    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;
    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [showRegionDelete, toggleRegionDelete]   = useState(false);

    const handleRegionViewer = () => {
        props.setRegionViewer(data._id);
    }
    const handleDelete = () => {
        props.deleteSubRegion(data._id, props.activeRegion._id, props.index);
    }

    const handleNameEdit = (e) => {
        props.setIndex(-1);
        toggleNameEdit(!editingName);
        const newName = e.target.value ? e.target.value : 'None';
        const prevName = name;
        if(newName !== prevName) {
            props.editSubRegion(data._id, 'name', newName, prevName);
        }
    };
    const handleCapitalEdit = (e) => {
        props.setIndex(-1);
        toggleCapitalEdit(!editingCapital);
        const newCapital = e.target.value ? e.target.value : 'None';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editSubRegion(data._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        props.setIndex(-1);
        toggleLeaderEdit(!editingLeader);
        const newLeader = e.target.value ? e.target.value : 'None';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editSubRegion(data._id, 'leader', newLeader, prevLeader);
        }
    };

    const handleMoving = (movement, editType) => {
        props.handleMoving(props.index+movement, editType);
    }

    const handleClick = (event) =>{
        clearTimeout(timer);
        if(event.detail === 1){
            timer = setTimeout(()=>{
                props.handleSetActive(props.data._id)
            }, 200)
        }else if (event.detail === 2){
           toggleNameEdit(!editingName)
        }
    }

    useEffect( () => {
        if (props.editType === "name"){
            if (editingName === false){
                toggleNameEdit(props.index === props.activeIndex);
                props.setEditType("");
            }
        }
        if (props.editType === "capital"){
            if (editingCapital === false){
                toggleCapitalEdit(props.index === props.activeIndex);
                props.setEditType("");
            }
        }
        if (props.editType === "leader"){
            if (editingLeader === false){
                toggleLeaderEdit(props.index === props.activeIndex);
                props.setEditType("");
            }
        }
    });

    return (
        <WRow className='table-entry'>
            <WCol size="3"> 
                {
                    editingName
                        ? <WInput
                            className='table-input' 
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {handleNameEdit(e)};
                                if (e.keyCode === 39) {
                                    handleNameEdit(e);
                                    toggleCapitalEdit(!editingCapital);
                                    toggleNameEdit(!editingName); 
                                }
                                if (e.keyCode === 40 && props.index != props.length-1){
                                    handleNameEdit(e);
                                    toggleNameEdit(!editingName); 
                                    handleMoving(1, "name");
                                }
                                if (e.keyCode === 38 && props.index != 0){
                                    handleNameEdit(e);
                                    toggleNameEdit(!editingName); 
                                    handleMoving(-1, "name");
                                }
                            }
                            }
                            onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                           />
                           :
                        <div className="table-text" onClick = {handleClick}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingCapital ? <WInput
                            className='table-input'
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) handleCapitalEdit(e);
                                if (e.keyCode === 39) {
                                    handleCapitalEdit(e)
                                    toggleCapitalEdit(!editingCapital);
                                    toggleLeaderEdit(!editingLeader)
                                }
                                if (e.keyCode === 37){
                                    handleCapitalEdit(e)
                                    toggleCapitalEdit(!editingCapital);
                                    toggleNameEdit(!editingName);   
                                }
                                if (e.keyCode === 40 && props.index != props.length-1){
                                    handleCapitalEdit(e)
                                    toggleCapitalEdit(!editingCapital); 
                                    handleMoving(1, "capital");
                                }
                                if (e.keyCode === 38 && props.index != 0){
                                    handleCapitalEdit(e)
                                    toggleCapitalEdit(!editingCapital); 
                                    handleMoving(-1, "capital");
                                }
                            }
                            }
                            onBlur={handleCapitalEdit}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"/>
                        :
                         <div className="table-text" onClick = {() => toggleCapitalEdit(true)}>{capital}</div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <WInput
                            className='table-input' 
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) handleLeaderEdit(e);
                                if (e.keyCode === 37){
                                    handleLeaderEdit(e)
                                    toggleLeaderEdit(!editingLeader);
                                    toggleCapitalEdit(!editingCapital);   
                                }
                                if (e.keyCode === 40 && props.index != props.length-1){
                                    handleLeaderEdit(e)
                                    toggleLeaderEdit(!editingLeader); 
                                    handleMoving(1, "leader");
                                }
                                if (e.keyCode === 38 && props.index != 0){
                                    handleLeaderEdit(e)
                                    toggleLeaderEdit(!editingLeader); 
                                    handleMoving(-1, "leader");
                                }
                            }
                            }
                            onBlur={handleLeaderEdit}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="table-input-class"/>
                :
                         <div className="table-text" onClick = {()=> toggleLeaderEdit(true)}>
                            {leader}
                        </div>
                }
            </WCol>
            <WCol size="2">
                {
                    // editingStatus ? <select
                    //     className='table-select'
                    //     autoFocus={true} 
                    // >
                    //     <option value="complete">complete</option>
                    //     <option value="incomplete">incomplete</option>
                    // </select>
    
                    <img id = "spreadflag" src = {"./The World/"+name+" flag"+".png"}></img>

                }
            </WCol>
            <WCol size="1">
                {
                         <div className="table-text landmark" onClick = {handleRegionViewer}>
                            {landmarks[0]}...
                        </div>
                }
            </WCol>
            <WCol size=".5">
                {
                    <WButton  wType="texted" onClick = {() => toggleRegionDelete(true)}>
                         <i className="material-icons">delete</i>
                    </WButton>
                }
            </WCol>
            <WCol size=".5">
                {
                    <WButton  wType="texted" onClick = {handleRegionViewer}>
                         <i className="material-icons">subject</i>
                    </WButton>
                }
            </WCol>
            { 
                <WModal className="delete-modal" cover="true" visible={showRegionDelete}>
                <WMHeader  className="modal-header" onClose={() => toggleRegionDelete(false)}>
                    Delete {name}?
                </WMHeader >

                <WMMain>
                    <WButton className="modal-button cancel-button" onClick={() => toggleRegionDelete(false)} wType="texted">
                        Cancel
                    </WButton>
                    <label className="col-spacer">&nbsp;</label>
                    <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                        Delete
                    </WButton>
                </WMMain>

            </WModal >}
        </WRow>
    );
};

export default SpreadSheetEntry;