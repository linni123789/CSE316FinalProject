import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const MapEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        props.updateMapName(props._id, e.target.value);
        handleEditing(e);
    };

    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    
    return (
        <WNavItem 
            className={entryStyle} 
            onDoubleClick={handleEditing} 
            // onClick={() => { props.handleSetActive(props._id) }} 
        >
            {
                editing ?   <WInput className="list-item-edit editmapname" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :   <div>
                                {props.name}
                                <WButton className="table-entry-buttons" onClick={() => props.deleteMap(props._id)} wType="texted">
                                    <i className="material-icons">close</i>
                                </WButton>
                            </div>
                            
            }
        </WNavItem>
    );
};

export default MapEntry;