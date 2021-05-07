import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
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
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateSubRegionField_Transaction, 
	DeleteSubRegion_Transaction,
	UpdateListItems_Transaction, 
	SortRegion_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';

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

	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeRegion, setActiveRegion] 		= useState({});
	const [showRegionViewer, toggleShowRegionViewer] = useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]    = useState(false);
	const [showWelcome, toggleWelcome] 		= useState(true);
	const [showMaps, toggleShowMaps]        = useState(false);
	const [showSpreadSheet, toggleShowSpreadSheet]  = useState(false);
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

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	// const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	// const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	// const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	// const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	// const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	// const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);

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

	// const reorderItem = async (itemID, dir) => {
	// 	let listID = activeList._id;
	// 	let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const createNewList = async () => {
	// 	let list = {
	// 		_id: '',
	// 		name: 'Untitled',
	// 		owner: props.user._id,
	// 		items: [],
	// 		sortRule: 'task',
	// 		sortDirection: 1
	// 	}
	// 	const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	if(data) {
	// 		loadTodoList(data.addTodolist);
	// 	} 
		
	// };
	// const deleteList = async (_id) => {
	// 	DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	loadTodoList({});
	// };

	// const updateListField = async (_id, field, value, prev) => {
	// 	let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };
	const editSubRegion = async (_id, field, value, prev) => {
		let transaction = new UpdateSubRegionField_Transaction(_id,field,prev,value,UpdateSubRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

	const handleSetActive = (_id) => {
		const selectedRegion = regions.find(region => region._id === _id);
		loadRegion(selectedRegion);
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
		const{data} = await AddNewSubRegion({variables:{_id: activeRegion._id}, refetchQueries: [{ query: GET_DB_REGION }]});
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
	}

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowDelete(!showDelete)
	};
	
	const setShowUpdate = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(false);
		toggleShowUpdate(!showUpdate);
	};

	const sort = (criteria) => {
		let transaction = new SortRegion_Transaction(activeRegion._id, criteria, SortRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
		
	}

	const addLandmark = async(_id, landmarkname) => {
		const {data}  = await AddLandmark({variables:{_id: _id, name : landmarkname}});
	}
	
	const deleteLandmark = async(_id, index) => {
		const {data}  = await DeleteLandmark({variables:{_id: _id, index : index}});
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
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				{
					activeRegion && showSpreadSheet ? 
					
							<div className="container-secondary">
								<Spreadsheet
									setShowDelete={setShowDelete}
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
				showDelete && (<Delete setShowDelete={setShowDelete} />)
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