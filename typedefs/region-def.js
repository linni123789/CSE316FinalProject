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
		getMapList: Region
	}
	extend type Mutation {
        addMap(region: RegionInput!): String
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