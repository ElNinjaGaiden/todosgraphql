import { gql } from 'react-apollo';

export const prioritiesListQuery = gql`
query PrioritiesListQuery {
    allPriorities {
        nodes {
            id
            name
        }
    }
}
`;