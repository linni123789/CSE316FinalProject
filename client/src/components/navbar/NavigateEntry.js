import React from 'react';
import { WNavItem } from 'wt-frontend';

const NavigateEntry = (props) => {
    const handlenav = () => {
        props.handleSetActive(props.region._id);
    }
    return (
        <div className = "navigate" onClick = {handlenav}>
            <span>{props.region.name+"=>"}</span>
        </div>
    );
};

export default NavigateEntry;