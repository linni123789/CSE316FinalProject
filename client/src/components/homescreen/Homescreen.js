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
import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
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
	const [activeRegion, setActiveRegion] 		= useState();
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
			if (region.parentRegion === "none"){
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

	// const mutationOptions = {
	// 	refetchQueries: [{ query: GET_DB_REGION }], 
	// 	awaitRefetchQueries: true,
	// 	onCompleted: () => handleSetActive(activeRegion._id)
	// }

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
	const[AddNewSubRegion] = useMutation(mutations.ADD_SUBREGION	);

	
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

	const handleSetActive = (_id) => {
		const selectedRegion = regions.find(region => region._id === _id);
		loadRegion(selectedRegion);
	};

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
			capital: "none",
			leader: "none",
			name: name,
			parentRegion: "none",
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
		handleSetActive(activeRegion._id);
		const{data} = await AddNewSubRegion({variables:{_id: activeRegion._id}, refetchQueries: [{ query: GET_DB_REGION }]});
		handleSetActive(activeRegion._id);
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

	// const sort = (criteria) => {
	// 	let prevSortRule = sortRule;
	// 	setSortRule(criteria);
	// 	let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
	// 	console.log(transaction)
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
		
	// }

	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
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