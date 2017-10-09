import { gql } from 'react-apollo';

export const todosListQuery = gql`
query TodosListQuery($sortCriteria:TodosOrderBy!) {
    allTodos(orderBy:$sortCriteria) {
        nodes {
            id
            title
            description
            statusid
            todostatusByStatusid {
                id
                name
            }
            priorityid
            priorityByPriorityid {
                id
                name
            }
            creatorid
            userByCreatorid {
                id
                firstname
                lastname
            }
            ownerid
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
        todo {
            id
            title
            description
            statusid
            todostatusByStatusid {
                id
                name
            }
            priorityid
            priorityByPriorityid {
                id
                name
            }
            creatorid
            userByCreatorid {
                id
                firstname
                lastname
            }
            ownerid
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

export const addTodoMutation = gql`
mutation CreateTodo($todo: RegistertodoInput!) {
  registertodo(input: $todo) {
    clientMutationId
  }
}
`;