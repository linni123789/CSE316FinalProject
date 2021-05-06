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
				capital: "None",
				leader: "None",
				name: "Untitled",
				parentRegion: _id,
				landmarks: [],
				subregions: []
			})
			const updated2 = await newSubRegion.save();
			return "done";
		},
		updateField: async(_,args) => {
			const{_id, field, value} = args;
			const regionId = new ObjectId(_id);
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
			let subregions = found.subregions;
			subregions.forEach((subregionId) =>
			
			)
			switch(criteria) {
				case 'name':
					if (subregions != subregions.sort(a,b => a.name.toUpperCase() > b.name.toUpperCase ? 1 : -1)){
						sortedsubregions = subregions.sort(a,b => a.name.toUpperCase() > b.name.toUpperCase ? 1 : -1);
					}
					else{
						sortedsubregions = subregions.sort(a,b => a.name.toUpperCase() < b.name.toUpperCase ? 1 : -1);
					}
					break;
				case 'capital':
					sortedItems = Sorting.byDueDate(found.items, newDirection);
					break;
				case 'leader':
					sortedItems = Sorting.byStatus(found.items, newDirection);
					break;
				}
			const updated = await Region.updateOne({_id: regionId}, {subregions: sortedsubregions});
			return "done"

		}

}
}   