import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;
export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!, $_id: String!) {
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName, _id: $_id) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;


export const ADD_MAP = gql`
	mutation AddMap($region: RegionInput!){
		addMap(region: $region)
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!){
		deleteMap(_id: $_id)
	}
`;

export const UPDATE_MAP = gql`
	mutation UpdateMap($_id: String!, $name: String!){
		updateMap(_id: $_id, name: $name)
	}
`;

export const ADD_SUBREGION = gql`
	mutation AddSubRegion($_id: String!){
		addSubRegion(_id: $_id)
	}
`;

export const UPDATE_FIELD = gql`
	mutation UpdateField($_id: String!, $field: String!, $value: String!){
		updateField(_id: $_id, field: $field, value: $value)
	}
`;

export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String!, $parentId: String!){
		deleteSubRegion(_id: $_id, parentId: $parentId)
	}
`;

export const READD_SUBREGION = gql`
	mutation ReAddSubRegion($_id: String!, $parentId: String!, $index: Int!){
		reAddSubRegion(_id: $_id, parentId: $parentId, index: $index)
	}
 `;


 export const SORT_REGION = gql`
	mutation SortRegion($_id: String!, $criteria: String!) {
		sortRegion(_id: $_id, criteria: $criteria) 
	}
`;


export const ADD_LANDMARK= gql`
mutation AddLandmark($_id: String!, $name: String!, $index: Int!) {
	addLandmark(_id: $_id, name: $name, index : $index) 
}
`;

export const DELETE_LANDMARK= gql`
mutation DeleteLandmark($_id: String!, $index: Int!) {
	deleteLandmark(_id: $_id, index: $index) 
}
`;

export const UPDATE_LANDMARK= gql`
mutation UpdateLandmark($_id: String!, $index: Int!, $name: String!) {
	updateLandmark(_id: $_id, index: $index, name: $name) 
}
`;

export const LATEST_MAP = gql`
mutation LatestMap($_id: String!){
	latestmap(_id: $_id)
}
`;

export const CHANGE_PARENT = gql`
mutation ChangeParent($_id: String!, $name: String!){
	changeParent(_id: $_id, name: $name)
}
`;