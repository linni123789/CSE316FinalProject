import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SpreadSheetEntry = (props) => {
    const { data } = props;
    // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    // const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const landmarks = data.landmarks;

    // const canMoveUp = props.index > 0 ? true : false;
    // const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    const [editingName, toggleDateEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
    const [editingAssigned, toggleAssignEdit] = useState(false);
    const handleRegionViewer = () => {
        props.setRegionViewer(data._id);
    }
    const handleDelete = () => {
        props.deleteSubRegion(data._id, props.activeRegion._id, props.index);
    }
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

    // const handleStatusEdit = (e) => {
    //     toggleStatusEdit(false);
    //     const newStatus = e.target.value ? e.target.value : false;
    //     const prevStatus = status;
    //     if(newStatus !== prevStatus) {
    //         props.editItem(data._id, 'completed', newStatus, prevStatus);
    //     }
    // };

    // const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Myself';
    //     const prevAssigned = assigned_to;
    //     if(newAssigned !== prevAssigned) {
    //         props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    // }

    return (
        <WRow className='table-entry'>
            <WCol size="3"> 
                {
                    // editingDescr || description === ''
                    //     ? <WInput
                    //         className='table-input' onBlur={handleDescrEdit}
                    //         autoFocus={true} defaultValue={description} type='text'
                    //         inputClass="table-input-class"
                    //     />
                        <div className="table-text" onClick = {() => props.handleSetActive(props.data._id)}
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
                    <WButton  wType="texted" onClick = {handleDelete}>
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
        </WRow>
    );
};

export default SpreadSheetEntry;