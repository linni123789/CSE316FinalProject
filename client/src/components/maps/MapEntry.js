import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const MapEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        console.log(props._id);
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        props.updateMapName(props._id, e.target.value);
    };
    
    return (
        <WNavItem 
            // onDoubleClick={handleEditing} 
        >
            {
                editing ?   <WInput className="list-item-edit editmapname" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :      
                            <div>
                            <div onClick={() => { props.handleSetActive(props._id) }} >
                                {props.name}
                            </div>
                                <WButton className="table-entry-buttons" onClick={() => props.deleteMap(props._id)} wType="texted">
                                    <i className="material-icons">close</i>
                                </WButton>
                                <WButton className="table-entry-buttons" onClick={handleEditing} wType="texted">
                                    <i className="material-icons">edit</i>
                                </WButton>
                            </div>
                            
                            
            }
        </WNavItem>
    );
};

export default MapEntry;