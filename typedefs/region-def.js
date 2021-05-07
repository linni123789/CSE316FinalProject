const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		owner: String!
		capital: String!
		leader: String!
		name: String!
		parentRegion: String!
		landmarks: [String]
		subregions: [String]
	}
	extend type Query {
		getAllRegions: [Region]
		getRegionByID: Region
	}
	extend type Mutation {
        addMap(region: RegionInput!): String
		deleteMap(_id: String!): String
		updateMap(_id: String!, name: String!): String
		addSubRegion(_id: String!): String
		updateField(_id: String!, field: String!, value: String!): String
		deleteSubRegion(_id: String!, parentId: String!): String
		reAddSubRegion(_id: String!, parentId: String!, index: Int!) : String
		sortRegion(_id: String!, criteria: String!): String
	}

	input RegionInput {
		_id: String
		owner: String
		capital: String
		leader: String
		name: String
		parentRegion: String
		landmarks: [String]
		subregions: [String]
	}
`;

module.exports = { typeDefs: typeDefs }