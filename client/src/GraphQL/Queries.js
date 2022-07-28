import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
    query {
        getAllUsers {
            firstName
            lastName
            email
        }
    }
`;

export const LOAD_USER = gql`
    query getUserByID($id: ID) {
        getUserByID(id: $id) {
            firstName
            lastName
            email
        }
    }
`;
