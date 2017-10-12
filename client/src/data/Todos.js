import { gql } from 'react-apollo';

export const todosListQuery = gql`
query TodosListQuery($sortCriteria:TodosOrderBy!) {
    allTodos(orderBy:$sortCriteria) {
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
        todo {
            id
        }
    }
}
`;

export const updateTodoMutation = gql`
mutation UpdateTodoById($input: UpdateTodoByIdInput!) {
    updateTodoById(input: $input) {
        todo {
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

export const addTodoMutation = gql`
mutation CreateTodo($todo: RegistertodoInput!) {
  registertodo(input: $todo) {
    todo {
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

export const getEmptyTodo = () => {
    return {
      id: null,
      createdOn: null,
      title: '',
      description: '',
      dueDate: null,
      //Child nodes
      userByCreatorid: null,
      todostatusByStatusid: { id: 1, name: 'Registered' },
      priorityByPriorityid: null,
      userByOwnerid: null
    };
  }