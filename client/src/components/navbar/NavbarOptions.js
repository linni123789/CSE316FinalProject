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
        props.setActiveRegion(null);
        props.toggleShowRegionViewer(false);
        if (data) {
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});
        }
    };

    const handleUpdate = async() => {
        props.setShowUpdate();
    }
    
    const handleLeftRegion = async() => {
        const parentRegion = props.parentRegion;
        const subregions = parentRegion.subregions;
        let index = subregions.indexOf(props.activeRegion._id);
        if (index != 0) {
            props.setRegionViewer(subregions[index-1]);
            props.tps.clearAllTransactions();
            props.setCanUndo(props.tps.hasTransactionToUndo());
            props.setCanRedo(props.tps.hasTransactionToRedo());
        }
    }

    const handleRightRegion = async() => {
        const parentRegion = props.parentRegion;
        const subregions = parentRegion.subregions;
        let index = subregions.indexOf(props.activeRegion._id);
        if (index != subregions.length-1) {
            props.setRegionViewer(subregions[index+1]);
            props.tps.clearAllTransactions();
            props.setCanUndo(props.tps.hasTransactionToUndo());
            props.setCanRedo(props.tps.hasTransactionToRedo());
        }
    }
    return (
        <WNavItem hoverAnimation="lighten">
            {props.showRegionViewer ? <WButton wType="texted" onClick = {handleLeftRegion}>
                        <i className="material-icons">arrow_backward</i>
            </WButton>
            :<div></div>
            }
            {props.showRegionViewer ? <WButton wType="texted" onClick = {handleRightRegion}>
                        <i className="material-icons">arrow_forward</i>
            </WButton>
            :<div></div>
            }
            {props.activeRegion ? <WButton onClick = {props.goHome} wType="texted">
                        <i className="material-icons">home</i>
            </WButton>
            :<div></div>
            }
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
                props.auth === false ? <LoggedOut setActiveRegion setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} toggleWelcome={props.toggleWelcome}/>
                : <LoggedIn fetchUser={props.fetchUser} 
                parentRegion = {props.parentRegion}
                activeRegion = {props.activeRegion}
                handleRegionViewer = {props.handleRegionViewer}
                setRegionViewer = {props.setRegionViewer} 
                toggleShowRegionViewer = {props.toggleShowRegionViewer} 
                setActiveRegion = {props.setActiveRegion} 
                activeRegion ={props.activeRegion} 
                goHome = {props.goHome} 
                logout={props.logout} 
                setShowUpdate = {props.setShowUpdate} 
                user = {props.user} 
                showRegionViewer = {props.showRegionViewer}
                toggleWelcome={props.toggleWelcome} 
                tps = {props.tps}
                canUndo = {props.canUndo}
                canRedo = {props.canRedo}
                setCanUndo = {props.setCanUndo}
                setCanRedo = {props.setCanRedo}
                toggleShowMaps = {props.toggleShowMaps}/>
            }
        </>

    );
};

export default NavbarOptions;