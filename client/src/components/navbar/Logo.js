import React from 'react';

const Logo = (props) => {
    return (
        <div className='logo' onClick ={props.goHome}>
            World Data Mapper
        </div>
    );
};

export default Logo;