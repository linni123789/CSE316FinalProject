import React from 'react';
import NavigateEntry      from './NavigateEntry';

const Navigate = (props) => {
    return (
        props.ancestorlist.reverse().map((entry, index) => (
            <NavigateEntry
                region = {entry} 
                handleSetActive = {props.handleSetActive}
            />
    ))
    );
};

export default Navigate;