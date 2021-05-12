import React, { useState }  from 'react';
import { WNavItem, WInput, WModal, WMHeader, WMMain, WButton  } from 'wt-frontend';

const MapEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        props.updateMapName(props._id, e.target.value);
    };

    const handleDelete = () => {
        props.deleteMap(props._id);
        props.setShowDelete(false);
    }
    return (
        <WNavItem 
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
                                <WButton className="table-entry-buttons" onClick={() => props.setShowDelete(true)} wType="texted">
                                    <i className="material-icons">close</i>
                                </WButton>
                                <WButton className="table-entry-buttons" onClick={handleEditing} wType="texted">
                                    <i className="material-icons">edit</i>
                                </WButton>
                            </div>
                            
                            
            }
            { 
                <WModal className="delete-modal" cover="true" visible={props.showDelete}>
                <WMHeader  className="modal-header" onClose={() => props.setShowDelete(false)}>
                    Delete {props.name}?
                </WMHeader >

                <WMMain>
                    <WButton className="modal-button cancel-button" onClick={() => props.setShowDelete(false)} wType="texted">
                        Cancel
                    </WButton>
                    <label className="col-spacer">&nbsp;</label>
                    <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                        Delete
                    </WButton>
                </WMMain>

            </WModal >}
        </WNavItem>
    );
};

export default MapEntry;