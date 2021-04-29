import React                    from 'react';
import { WButton, WRow, WCol }  from 'wt-frontend';

const MapHeader = (props) => {
    const disabledClick = () => {};
    const buttonStyle = props.activeid ? ' sidebar-buttons-disabled ' : '';
    const buttonOptions = props.activeid ? {shape:"rounded" } : {clickAnimation:"ripple-light" , shape:"rounded", color:"primary"};
    return (
        <WRow className='map-header'>
            <WCol size="7">
                <WButton wType="texted" hoverAnimation="text-primary" className='sidebar-header-name'>
                    Your Maps
                </WButton>
            </WCol>

            <WCol size="5">
                {
                    props.auth && <div className="sidebar-options">
                        <WButton className={`${buttonStyle} sidebar-buttons background`} onClick={props.activeid ? disabledClick : props.createNewList} {...buttonOptions}>
                            <i className="material-icons">add</i>
                        </WButton>

                    </div>
                }
            </WCol>

        </WRow>

    );
};

export default MapHeader;