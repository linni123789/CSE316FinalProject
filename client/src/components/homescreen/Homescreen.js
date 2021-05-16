import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import UpdateAccount					from '../modals/UpdateAccount';
import Spreadsheet 						from '../main/SpreadSheet';
import RegionViewer 					from '../regionviewer/RegionViewer.js'
import Welcome 							from '../main/Welcome';
import MapContents                      from '../maps/MapContents'
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_REGION } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import Navigate from '../navbar/Navigate';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateSubRegionField_Transaction, 
	DeleteSubRegion_Transaction,
	AddSubRegion_Transaction, 
	SortRegion_Transaction, 
	AddLandmark_Transaction,
	DeleteLandmark_Transaction } 				from '../../utils/jsTPS';

const Homescreen = (props) => {
	const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let regions	= []; 
	let maps = [];
	let activeSubRegions = [];
	let parentRegion;
	let ancestorlist = [];
	
	const [activeRegion, setActiveRegion] 		= useState(null);
	const [showRegionViewer, toggleShowRegionViewer] = useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]    = useState(false);
	const [showWelcome, toggleWelcome] 		= useState(true);
	const [showMaps, toggleShowMaps]        = useState(false);
	const [showSpreadSheet, toggleShowSpreadSheet]  = useState(false);
	const [showStatus, toggleShowStatus] = useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());


	const { loading, error, data, refetch } = useQuery(GET_DB_REGION);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) {
		for(let region of data.getAllRegions) {
			regions.push(region)
			if (region.parentRegion === "None"){
				maps.push(region)
			}
		}
		if (activeRegion){
			let subregionsID = activeRegion.subregions;
			if (subregionsID !== undefined){
				subregionsID.forEach((subregionID) => {
					regions.forEach((region) =>{
						if (subregionID === region._id)
							activeSubRegions.push(region)
					})
				}
				)
			}
			regions.forEach((region) => {
				if (region._id == activeRegion.parentRegion){
					parentRegion = region
				}
			})
		}
		if (activeRegion !== null){
			let currentRegion = activeRegion;
			while (currentRegion.parentRegion !== "None"){
				parentRegion = regions.find(region => currentRegion.parentRegion === region._id);
				ancestorlist.push(parentRegion);
				currentRegion = parentRegion;
			}
		}
	}
	const loadRegion = (region) => {
		setActiveRegion(region);
		toggleShowMaps(false);
		toggleShowSpreadSheet(true);
		toggleShowRegionViewer(false);
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGION }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadRegion()
	}

	const[AddMap] = useMutation(mutations.ADD_MAP);
	const[DeleteMap] = useMutation(mutations.DELETE_MAP);
	const[UpdateMap] = useMutation(mutations.UPDATE_MAP);
	const[AddNewSubRegion] = useMutation(mutations.ADD_SUBREGION, mutationOptions);
	const[UpdateSubRegionField] = useMutation(mutations.UPDATE_FIELD, mutationOptions);
	const[DeleteSubRegion] = useMutation(mutations.DELETE_SUBREGION,mutationOptions);
	const[ReAddSubRegion] = useMutation(mutations.READD_SUBREGION,mutationOptions);
	const[SortRegion] = useMutation(mutations.SORT_REGION, mutationOptions);
	const[AddLandmark] = useMutation(mutations.ADD_LANDMARK, mutationOptions);
	const[DeleteLandmark] = useMutation(mutations.DELETE_LANDMARK, mutationOptions);
	const[UpdateLandmark] = useMutation(mutations.UPDATE_LANDMARK, mutationOptions);
	const[LatestMap] = useMutation(mutations.LATEST_MAP, mutationOptions);
	const[ChangeParent] = useMutation(mutations.CHANGE_PARENT,mutationOptions)

	
	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const editSubRegion = async (_id, field, value, prev) => {
		let transaction = new UpdateSubRegionField_Transaction(_id,field,prev,value,UpdateSubRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const handleSetActive = async(_id) => {
		props.tps.clearAllTransactions();
		const selectedRegion = regions.find(region => region._id === _id);
		loadRegion(selectedRegion);
		if (selectedRegion.parentRegion == "None"){
			await LatestMap({variables:{_id: _id, refetchQueries: [{query: GET_DB_REGION}]}});
		}
		props.tps.clearAllTransactions();
		toggleShowStatus(true);
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
	};

	const reloadRegion = async () => {
        if(activeRegion._id){
            let tempID = activeRegion._id;
            let region = regions.find(region => region._id === tempID);
            setActiveRegion(region);
        }
    }
	const setRegionViewer = (_id) => {
		const selectedRegion = regions.find(region=> region._id === _id);
		setActiveRegion(selectedRegion);
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		toggleShowStatus(true);
		toggleShowSpreadSheet(false);
		toggleShowRegionViewer(true);
	}
	const addMap = async(name) => {
		let Map = {
			_id: "",
			owner: props.user._id,
			capital: "None",
			leader: "None",
			name: name,
			parentRegion: "None",
			landmarks: [],
			subregions: []
		}
		const{data} = await AddMap({ variables: {region: Map}, refetchQueries: [{ query: GET_DB_REGION }]});
	}

	const deleteMap = async(id) => {
		const{data} = await DeleteMap({variables:{_id: id},refetchQueries: [{ query: GET_DB_REGION }]});
	}

	const updateMapName = async(_id, name) => {
		const{data} = await UpdateMap({variables:{_id: _id, name: name}, refetchQueries: [{ query: GET_DB_REGION }]});
	}

	const addSubRegion = async() => {
		let transaction = new AddSubRegion_Transaction(activeRegion._id, AddNewSubRegion, DeleteSubRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const changeParent = async(_id, name) => {
		const {data} = await ChangeParent({variables:{_id: _id, name: name}, refetchQueries: [{ query: GET_DB_REGION }]});
		if (data.changeParent == "notdone"){
			alert("No region found");
		}
	}

	const deleteSubRegion = async(_id, parentid, index) => {
		let transaction = new DeleteSubRegion_Transaction(_id, parentid, index, DeleteSubRegion, ReAddSubRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const goHome = () =>{
		toggleShowMaps(true);
		toggleShowRegionViewer(false);
		toggleShowSpreadSheet(false);
		setActiveRegion(null);
		toggleShowStatus(false);
	}

	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};
	
	const setShowUpdate = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(!showUpdate);
	};

	const sort = (criteria) => {
		let transaction = new SortRegion_Transaction(activeRegion._id, criteria, SortRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const addLandmark = async(_id, landmarkname,index) => {
		if (activeRegion.landmarks.indexOf(landmarkname) == -1){
			let transaction = new AddLandmark_Transaction(_id, landmarkname, index, AddLandmark, DeleteLandmark);
			props.tps.addTransaction(transaction);
			tpsRedo();
		}
		else{
			alert("Same landmark name");
		}
	}
	
	const deleteLandmark = async(_id, landmarkname, index) => {
		let transaction = new DeleteLandmark_Transaction(_id, landmarkname, index, DeleteLandmark, AddLandmark);
		props.tps.addTransaction(transaction);
		tpsRedo();
		// const {data}  = await DeleteLandmark({variables:{_id: _id, index : index}});
	}

	const updateLandmark = async(_id, index, name) => {
		const {data}  = await UpdateLandmark({variables:{_id: _id, index : index, name : name}});
	}

	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' goHome={goHome}/>
							{showStatus && <Navigate
							handleSetActive = {handleSetActive}
							ancestorlist = {ancestorlist}
							/>}
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							setShowUpdate = {setShowUpdate}
							user = {props.user}
							toggleShowMaps = {toggleShowMaps}
							toggleWelcome = {toggleWelcome}
							activeRegion = {activeRegion}
							goHome = {goHome}
							setActiveRegion = {setActiveRegion}
							toggleShowRegionViewer = {toggleShowRegionViewer}
							showRegionViewer = {showRegionViewer}
							parentRegion = {parentRegion}
							activeRegion = {activeRegion}
							setRegionViewer = {setRegionViewer}
							tps =  {props.tps}
							canUndo = {canUndo}
							canRedo = {canRedo}
							setCanUndo = {setCanUndo}
							setCanRedo = {setCanRedo}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				{
					activeRegion && showSpreadSheet ? 
					
							<div className="container-secondary">
								<Spreadsheet
									activeRegion={activeRegion} setActiveList={loadRegion}
									regions = {regions}
									addSubRegion={addSubRegion}
									handleSetActive = {handleSetActive}
									goHome ={goHome}
									activeSubRegions = {activeSubRegions}
									setRegionViewer = {setRegionViewer}
									editSubRegion = {editSubRegion}
									canUndo = {canUndo}
									canRedo = {canRedo}
									undo = {tpsUndo}
									redo = {tpsRedo}
									deleteSubRegion = {deleteSubRegion}
									sort = {sort}
									ancestorlist = {ancestorlist}
								/>
							</div>
						:
							<div className="container-secondary" />
				}

			</WLMain>
			<WLMain>
				{
					activeRegion && showRegionViewer ? 
					
							<div className="container-secondary">
								<RegionViewer
									data = {activeRegion}			
									regions = {regions}
									handleSetActive = {handleSetActive}
									parentRegion = {parentRegion}
									addLandmark = {addLandmark}
									updateLandmark = {updateLandmark}
									deleteLandmark = {deleteLandmark}
									canUndo = {canUndo}
									canRedo = {canRedo}
									undo = {tpsUndo}
									redo = {tpsRedo}
									changeParent = {changeParent}
								/>
							</div>
						:
							<div className="container-secondary" />
				}

			</WLMain>
			{
				showWelcome && (<Welcome/>)
			}
			{
				showMaps && (<MapContents addMap = {addMap} handleSetActive = {handleSetActive} maps = {maps} deleteMap = {deleteMap} updateMapName = {updateMapName} reloadRegions={refetch}/>)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser}toggleShowMaps = {toggleShowMaps} toggleWelcome = {toggleWelcome} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadRegions={refetch} setShowLogin={setShowLogin} toggleShowMaps = {toggleShowMaps} toggleWelcome = {toggleWelcome} setShowUpdate={setShowUpdate}/>)
			}

			{
				showUpdate && (<UpdateAccount fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} user = {props.user} />)
			}

		</WLayout>
	);
};

export default Homescreen;