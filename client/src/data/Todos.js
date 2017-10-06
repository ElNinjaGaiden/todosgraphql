import { gql } from 'react-apollo';

export const todosListQuery = gql`
query TodosListQuery {
    allTodos {
        nodes {
            id
            title
            description
            todostatusByStatusid {
                id
                name
            }
            priorityByPriorityid {
                id
                name
            }
            userByCreatorid {
                id
                firstname
                lastname
            }
            userByOwnerid {
                id
                firstname
                lastname
            }
            createdon
            duedate
        }
    }
}
`;

export const deleteTodoMutation = gql`
mutation DeleteTodo($input: DeleteTodoByIdInput!) {
    deleteTodoById(input: $input) {
    clientMutationId
  }
}
`;

export const updateTodoMutation = gql`
mutation UpdateTodoById($input: UpdateTodoByIdInput!) {
    updateTodoById(input: $input) {
        clientMutationId
    }
}
`;

export const addTodoMutation = gql`
mutation CreateTodo($todo: RegistertodoInput!) {
  registertodo(input: $todo) {
    clientMutationId
  }
}
`;