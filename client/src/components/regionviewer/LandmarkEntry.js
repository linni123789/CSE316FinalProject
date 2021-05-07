import React, { useState }  from 'react';
import { WNavItem, WInput, WButton } from 'wt-frontend';

const LandmarkEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        props.updateLandmark(props._id, props.index, e.target.value);
    };
    
    return (
        <div> 

            {
                editing ?   <WInput className="list-item-edit editmapname" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                            />
                        :      
                            <div>
                                <div>
                                    {props.name}
                                </div>
                                <WButton className="table-entry-buttons" onClick={() => props.deleteLandmark(props._id, props.index)} wType="texted">
                                    <i className="material-icons">close</i>
                                </WButton>
                                <WButton className="table-entry-buttons" onClick={handleEditing} wType="texted">
                                    <i className="material-icons">edit</i>
                                </WButton>
                            </div>
                            
                            
            }
        </div>
    );
};

export default LandmarkEntry;