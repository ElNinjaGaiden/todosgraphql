import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, addTodoMutation } from '../data/Todos';

const AddTodoButtonTemplate = ({mutate, onAdd, todo, user, sortCriteria, disabled}) => {

    const onAddClick = () => {
        mutate({
            variables: {
                todo: {
                  title: todo.title,
                  description: todo.description,
                  statusid: todo.todostatusByStatusid.id,
                  priorityid: todo.priorityByPriorityid.id,
                  ownerid: todo.userByOwnerid ? todo.userByOwnerid.id : null,
                  creatorid: user.id,
                  duedate: `${todo.dueDate.getFullYear()}-${todo.dueDate.getMonth() + 1}-${todo.dueDate.getDate()}`
                }
              },
              optimisticResponse: {
                registertodo: {
                  __typename: 'RegistertodoPayload',
                  todo: {
                    __typename: 'Todo',
                    id: Math.round(Math.random() * -1000000),
                    ownerid: todo.ownerId,
                    title: todo.title,
                    description: todo.description,
                    createdon: new Date().toISOString(),
                    duedate: `${todo.dueDate.getFullYear()}-${todo.dueDate.getMonth() + 1}-${todo.dueDate.getDate()}`,
                    todostatusByStatusid: {
                      __typename: 'Todostatus',
                      id: todo.todostatusByStatusid.id,
                      name: todo.todostatusByStatusid.name
                    },
                    priorityByPriorityid: {
                      __typename: 'Priority',
                      id: todo.priorityByPriorityid.id,
                      name: todo.priorityByPriorityid.name
                    },
                    userByCreatorid: {
                      __typename: 'User',
                      id: user.id,
                      firstname: user.firstname,
                      lastname: user.lastname
                    },
                    userByOwnerid: {
                      __typename: 'User',
                      id: todo.userByOwnerid && todo.userByOwnerid.id,
                      firstname: todo.userByOwnerid && todo.userByOwnerid.firstname,
                      lastname: todo.userByOwnerid && todo.userByOwnerid.lastname
                    }
                  }
                },
              },
              update: (store, { data: { registertodo } }) => {
                // Read the data from the cache for this query.
                const data = store.readQuery({query: todosListQuery, variables: { sortCriteria: sortCriteria } });
                if (!data.allTodos.nodes.find((n) => n.id === registertodo.todo.id)) {
                  data.allTodos.nodes.unshift(registertodo.todo);
                }
                // Write the data back to the cache.
                store.writeQuery({ query: todosListQuery, variables: { sortCriteria: sortCriteria }, data });
                if(typeof onAdd === 'function') {
                  onAdd();
                }
              },
              refetchQueries: [
                { 
                  query: todosListQuery,
                  variables: {
                    sortCriteria: sortCriteria
                  }
                }
              ]
          });
          // .then(res => {
          //     if(typeof onAdd === 'function') {
          //       onAdd();
          //     }
          // });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Add" primary={true} disabled={disabled}
            onClick={onAddClick} />
}

const AddTodoButton = graphql(addTodoMutation)(AddTodoButtonTemplate);
export default AddTodoButton;