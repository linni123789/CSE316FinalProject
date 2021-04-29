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
			console.log(_id);
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			return "done";
		},
		updateMap: async(_,args) => {
			const{_id, name} = args;
			console.log(name);
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne(({_id: objectId}, {name: name}));
			return "done";
		}
}
}   