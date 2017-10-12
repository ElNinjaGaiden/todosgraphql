import { gql } from 'react-apollo';

export const TodosStatusesListQuery = gql`
query TodosStatusesListQuery {
    allTodostatuses {
        nodes {
            id
            name
        }
    }
}
`;