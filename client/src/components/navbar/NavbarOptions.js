import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        props.toggleWelcome(true);
        props.toggleShowMaps(false);
        if (data) {
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});
        }
    };

    const handleUpdate = async() => {
        props.setShowUpdate();
    }

    return (
        <WNavItem hoverAnimation="lighten">
           <WButton className="navbar-options" onClick={handleUpdate} wType="texted" hoverAnimation="text-primary">
                {props.user.firstName + " "+ props.user.lastName}
            </WButton>
            <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
                    Sign Up 
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} toggleWelcome={props.toggleWelcome}/>
                : <LoggedIn fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} setShowUpdate = {props.setShowUpdate} user = {props.user} toggleWelcome={props.toggleWelcome} toggleShowMaps = {props.toggleShowMaps}/>
            }
        </>

    );
};

export default NavbarOptions;