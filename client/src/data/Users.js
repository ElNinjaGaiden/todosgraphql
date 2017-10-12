import { gql } from 'react-apollo';

export const userListQuery = gql`
query UsersListQuery {
    allUsers {
        nodes {
            id
            firstname
            lastname
        }
    }
}
`;

export const userByIdQuery = gql`
query UserById($id:Int!) {
    userById(id:$id) {
        id
        firstname
        lastname
    }
}
`;