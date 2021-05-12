import React, { useState } from 'react';
import { WCol, WRow, WNavItem, WInput, WModal, WMHeader, WMMain, WButton  } from 'wt-frontend';

const SpreadSheetEntry = (props) => {
    const { data } = props;
    // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    // const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';
    var timer = 0;
    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;

    // const canMoveUp = props.index > 0 ? true : false;
    // const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [editingAssigned, toggleAssignEdit] = useState(false);
    const handleRegionViewer = () => {
        props.setRegionViewer(data._id);
    }
    const handleDelete = () => {
        props.deleteSubRegion(data._id, props.activeRegion._id, props.index);
        props.toggleRegionDelete(false);
    }

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'None';
        const prevName = name;
        if(newName !== prevName) {
            props.editSubRegion(data._id, 'name', newName, prevName);
        }
    };
    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'None';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editSubRegion(data._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'None';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editSubRegion(data._id, 'leader', newLeader, prevLeader);
        }
    };


    const handleClick = (event) =>{
        clearTimeout(timer);
        if(event.detail === 1){
            timer = setTimeout(()=>{
                props.handleSetActive(props.data._id)
            }, 200)
        }else if (event.detail === 2){
           toggleNameEdit(!editingName)
           console.log("hello");
        }
    }

    return (
        <WRow className='table-entry'>
            <WCol size="3"> 
                {
                    editingName
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
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
                            className='table-input' onBlur={handleCapitalEdit}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"/>
                        :
                         <div className="table-text" onClick = {() => toggleCapitalEdit(true)}>{capital}</div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <WInput
                    className='table-input' onBlur={handleLeaderEdit}
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
                         <div className="table-text">
                            Flag
                        </div>
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
                    <WButton  wType="texted" onClick = {() => props.toggleRegionDelete(true)}>
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
                <WModal className="delete-modal" cover="true" visible={props.showRegionDelete}>
                <WMHeader  className="modal-header" onClose={() => props.toggleRegionDelete(false)}>
                    Delete {name}?
                </WMHeader >

                <WMMain>
                    <WButton className="modal-button cancel-button" onClick={() => props.toggleRegionDelete(false)} wType="texted">
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