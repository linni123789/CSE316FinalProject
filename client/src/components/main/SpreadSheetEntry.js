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
    const [editingCapital, toggleDescrEdit] = useState(false);
    const [editingLeader, toggleStatusEdit] = useState(false);
    const [editingAssigned, toggleAssignEdit] = useState(false);

    const handleRegionViewer = () => {
        props.setRegionViewer(data._id);
    }
    // const disabledButton = () => {}

    // const handleDateEdit = (e) => {
    //     toggleDateEdit(false);
    //     const newDate = e.target.value ? e.target.value : 'No Date';
    //     const prevDate = due_date;
    //     if(newDate !== prevDate) {
    //         props.editItem(data._id, 'due_date', newDate, prevDate);
    //     }

    // };

    // const handleDescrEdit = (e) => {
    //     toggleDescrEdit(false);
    //     const newDescr = e.target.value ? e.target.value : 'No Description';
    //     const prevDescr = description;
    //     if(newDescr !== prevDescr) {
    //         props.editItem(data._id, 'description', newDescr, prevDescr);
    //     }
    // };

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
                    // editingDate ? <WInput
                    //     className='table-input'
                    //     autoFocus={true} defaultValue={due_date} type='date'
                    //     wtype="outlined" baranimation="solid" inputclass="table-input-class"
                    // />
                         <div className="table-text">{capital}
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
            <WCol size="2">
                {
                         <div className="table-text">
                            none
                        </div>
                }
            </WCol>
            <WCol size="1">
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