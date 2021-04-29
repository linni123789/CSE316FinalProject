import React from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Welcome = (props) => {
    return (
        <div className="welcome">
             <img src = 'https://media.istockphoto.com/photos/earth-picture-id1128667076?k=6&m=1128667076&s=612x612&w=0&h=sobgNl_vFyW8wr4NavT3cKlmwnEoluMGRfOPieMW5hg='></img>
            Welcome to the World Data Mapper
        </div>
    );
};

export default Welcome;