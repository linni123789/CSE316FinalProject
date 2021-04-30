import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_TODOS = gql`
	query GetDBTodos {
		getAllTodos {
			_id
			name
			owner
			items {
				_id
				description
				due_date
				assigned_to
				completed
			}
			sortRule
			sortDirection
		}
	}
`;


export const GET_DB_REGION = gql`
	query GetDBRegions{
		getAllRegions{
			_id
			owner
			capital
			leader
			name
			parentRegion
			landmarks
			subregions
		}
	}
`;

export const GET_DB_REGION_BY_ID = gql`
	query GetRegionById{
		getRegionById{
			_id
			owner
			capital
			leader
			name
			parentRegion
			landmarks
			subregions
		}
	}
`;