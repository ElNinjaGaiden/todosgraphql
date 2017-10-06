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