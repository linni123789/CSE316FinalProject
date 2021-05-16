import React, { useState }  from 'react';
import { WCol, WRow, WNavItem, WInput, WModal, WMHeader, WMMain, WButton} from 'wt-frontend';
const LandmarkEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        if (props.current){
            e.stopPropagation();
            setPreEdit(props.name);
            toggleEditing(!editing);
        }
    };

    const handleSubmit = (e) => {
        if (props.current){
            handleEditing(e);
            props.updateLandmark(props._id, props.index, e.target.value);
        }
    };
    
    const [showLandmarkDelete, toggleLandmarkDelete]   = useState(false);

    const handledeleteLandmark = (e) => {
        if (props.current){
            props.deleteLandmark(props._id, props.name, props.index)
            toggleLandmarkDelete(false);
        }
    }
    
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
                                <WButton disabled = {!props.current} onClick={() => toggleLandmarkDelete(true)} wType="texted">
                                    <i className="material-icons">close</i>
                                </WButton>
                                <WButton  disabled = {!props.current} onClick={handleEditing} wType="texted">
                                    <i className="material-icons">edit</i>
                                </WButton>
                            </div>
                            
                            
            }
                        { 
                <WModal className="delete-modal" cover="true" visible={showLandmarkDelete && props.current}>
                <WMHeader  className="modal-header" onClose={() => toggleLandmarkDelete(false)}>
                    Delete {props.name}?
                </WMHeader >

                <WMMain>
                    <WButton className="modal-button cancel-button" onClick={() => toggleLandmarkDelete(false)} wType="texted">
                        Cancel
                    </WButton>
                    <label className="col-spacer">&nbsp;</label>
                    <WButton className="modal-button" onClick={handledeleteLandmark} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                        Delete
                    </WButton>
                </WMMain>

            </WModal >}
        </div>
    );
};

export default LandmarkEntry;