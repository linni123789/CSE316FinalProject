const Region = require('../models/region-model');
const ObjectId = require('mongoose').Types.ObjectId;
// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		getAllRegions: async(_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if (!_id) { return([])};
			const regions = await Region.find(({owner:_id}));
			if (regions){
				return (regions);
			}
		},
		getRegionByID: async(_,args) => {
			const {_id} = args;
			const objectId = new ObjectId(_id);
			const region = await Region.find({_id: objectId});
			if (region){
				return(region);
			}
		}
	},
	Mutation: {
        addMap: async(_, args) => {
            const {region} = args;
			const {_id, owner, capital, leader, name, parentRegion, landmarks, subregions } = region
			const listId = new ObjectId();
			let newRegion = new Region({
				_id: listId,
				owner: owner,
				capital: capital,
				leader: leader,
				name: name,
				parentRegion: parentRegion,
				landmarks: landmarks,
				subregions: subregions
			})
			const updated = await newRegion.save();
			return "done";
		},
		deleteMap: async(_,args) => {
			const{_id} = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			return "done";
		},
		updateMap: async(_,args) => {
			const{_id, name} = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {name: name});
			return "done";
		},
		addSubRegion: async(_,args) => {								
			const{_id} = args;
			const objectId = new ObjectId(_id);
			const parentRegion = await Region.findOne({_id: objectId});
			const newRegionID = new ObjectId();
			parentRegion.subregions.push(newRegionID);
			const updated = await Region.updateOne({_id: objectId},{subregions: parentRegion.subregions});
			let newSubRegion = new Region({
				_id: newRegionID,
				owner: parentRegion.owner,
				capital: "none",
				leader: "none",
				name: "Untitled",
				parentRegion: _id,
				landmarks: [],
				subregions: []
			})
			const updated2 = await newSubRegion.save();
			return newRegionID;
		},
		updateField: async(_,args) => {
			const{_id, field, value} = args;
			const regionId = new ObjectId(_id);
			if (field == "name"){
				const updated = await Region.updateOne({_id:regionId}, {name: value});
			}
			if (field == "capital"){
				const updated = await Region.updateOne({_id:regionId}, {capital: value});
			}
			if (field == "leader"){
				const updated = await Region.updateOne({_id:regionId}, {leader: value});
			}
			return "done";
		},
		deleteSubRegion: async(_,args) => {
			const{_id, parentId} = args;
			const regionId = new ObjectId(parentId);
			const parentRegion = await Region.findOne({_id: regionId});
			const index = parentRegion.subregions.indexOf(_id);
			parentRegion.subregions.splice(index,1);
			const updated = await Region.updateOne({_id: regionId},{subregions: parentRegion.subregions});
			return "done";
		},
		reAddSubRegion: async(_,args) => {
			const{_id, parentId, index} = args;
			const regionId = new ObjectId(parentId);
			const parentRegion = await Region.findOne({_id: regionId});
			parentRegion.subregions.splice(index, 0, _id);
			const updated = await Region.updateOne({_id: regionId},{subregions: parentRegion.subregions});
			return "done";
		},
		sortRegion: async(_,args) => {
			const { _id, criteria } = args;
			const regionId = new ObjectId(_id);
			const found = await Region.findOne({_id: regionId});
			let subregionIDs = found.subregions;
			let subregions = [];
			let reverseSort = true;
			for (subregionId of subregionIDs){
				const found = await Region.findOne({_id: subregionId});
				subregions.push(found);
			}
			switch(criteria) {
				case 'name':
					for (var i = 0 ; i < subregions.length-1 ; i++){
						if (subregions[i].name > subregions[i+1].name){
							reverseSort = false;
							break;
						}
					}
					if (reverseSort){
						subregions.sort((a,b) => a.name.toUpperCase() <= b.name.toUpperCase() ? 1 : -1);
					}
					else{
						subregions.sort((a,b) => a.name.toUpperCase() >= b.name.toUpperCase() ? 1 : -1)
					}
					break;
				case 'capital':
					for (var i = 0 ; i < subregions.length-1 ; i++){
						if (subregions[i].capital > subregions[i+1].capital){
							reverseSort = false;
							break;
						}
					}
					if (reverseSort){
						subregions.sort((a,b) => a.capital.toUpperCase() <= b.capital.toUpperCase() ? 1 : -1);
					}
					else{
						subregions.sort((a,b) => a.capital.toUpperCase() >= b.capital.toUpperCase() ? 1 : -1)
					}
					break;
				case 'leader':
					for (var i = 0 ; i < subregions.length-1 ; i++){
						if (subregions[i].leader > subregions[i+1].leader){
							reverseSort = false;
							break;
						}
					}
					if (reverseSort){
						subregions.sort((a,b) => a.leader.toUpperCase() <= b.leader.toUpperCase() ? 1 : -1);
					}
					else{
						subregions.sort((a,b) => a.leader.toUpperCase() >= b.leader.toUpperCase() ? 1 : -1)
					}
					break;
			}
			let updatedsubregions = [];
			for (subregion of subregions){
				updatedsubregions.push(subregion._id);
			}
			const updated = await Region.updateOne({_id: regionId}, {subregions: updatedsubregions});
			return "done";

		},
		addLandmark: async(_,args) => {
			const{_id, name, index} = args;
			const regionID = new ObjectId(_id);
			let found = await Region.findOne({_id: regionID});
			// let regionName = found.name;
			found.landmarks.splice(index, 0, name);
			const updated = await Region.updateOne({_id:regionID}, {landmarks: found.landmarks});
			// let ancestor = await Region.findOne({_id: regionID});
			// while (ancestor.parentRegion != "None"){
			// 	let ancestorID = new ObjectId(ancestor.parentRegion);
			// 	let ancestor = await Region.findOne({_id: ancestorID});
			// 	ancestor.landmarks.push(name+"-"+regionName);
			// 	await Region.updateOne({_id:ancestorID}, {landmarks: ancestor.landmarks});
			// }
			return "done";
		},
		updateLandmark: async(_,args) => {
			const{_id, index, name} = args;
			const regionID = new ObjectId(_id);
			const found = await Region.findOne({_id: regionID});
			found.landmarks[index] = name;
			const updated = await Region.updateOne({_id:regionID}, {landmarks: found.landmarks});
			return "done";

		},
		deleteLandmark: async(_,args) => {
			const{_id, index} = args;
			const regionID = new ObjectId(_id);
			const found = await Region.findOne({_id: regionID});
			found.landmarks.splice(index,1);
			const updated = await Region.updateOne({_id:regionID}, {landmarks: found.landmarks});
			return "done";
		},
		latestmap: async(_,args) => {
			const{_id} = args;
			const regionID = new ObjectId(_id);
			const found = await Region.findOne({_id: regionID});
			// const {saved} = await found.save();
			const {owner, capital, leader, name, parentRegion, landmarks, subregions } = found
			let newRegion = new Region({
				_id: _id,
				owner: owner,
				capital: capital,
				leader: leader,
				name: name,
				parentRegion: parentRegion,
				landmarks: landmarks,
				subregions: subregions
			})
			const deleted = await Region.deleteOne({_id: regionID});
			await newRegion.save();
			return "done";
		},
		changeParent: async(_,args) => {
			const{_id, name} = args;
			if (await Region.findOne({name: name})){
				const regionID = new ObjectId(_id);
				const child = await Region.findOne({_id: regionID});
				const parentregionID = new ObjectId(child.parentRegion);
				const parent = await Region.findOne({_id: parentregionID});
				var filtered = parent.subregions.filter(function(value, index, arr){ 
					return value != child._id;
				});
				const updatedparent = await Region.updateOne({_id:parentregionID}, {subregions: filtered});
				const newparent = await Region.findOne({name: name});
				newparent.subregions.push(_id);
				const updatedchild = await Region.updateOne({_id:regionID}, {parentRegion: newparent._id});
				const newparentregionID = new ObjectId(newparent._id);
				const updatednewparent = await Region.updateOne({_id: newparentregionID}, {subregions: newparent.subregions});
			}
			else{
				return "notdone";
			}
			return "done";
		}

}
}   