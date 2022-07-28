import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            id
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $firstName: String!, $lastName: String!) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
            firstName
            lastName
            email
            id
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;
