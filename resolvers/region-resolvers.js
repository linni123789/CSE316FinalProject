const Region = require('../models/region-model');
const ObjectId = require('mongoose').Types.ObjectId;

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {

	},
	Mutation: {
        addMap: async (_, args) => {
            console.log("adding map")
			return "done";
		}
}
}   