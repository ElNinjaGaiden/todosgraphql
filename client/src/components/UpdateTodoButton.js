import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, updateTodoMutation } from '../data/Todos';

const UpdateTodoButtonTemplate = ({mutate, onUpdate, todo, sortCriteria, disabled}) => {

    const onUpdateClick = () => {

        mutate({
            variables: {
              input: {
                  id: todo.id,
                  todoPatch: {
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    statusid: todo.todostatusByStatusid.id,
                    priorityid: todo.priorityByPriorityid.id,
                    ownerid: todo.userByOwnerid ? todo.userByOwnerid.id : null,
                    creatorid: todo.userByCreatorid.id,
                    duedate: `${todo.dueDate.getFullYear()}-${todo.dueDate.getMonth() + 1}-${todo.dueDate.getDate()}`
                  }
              }
            },
            optimisticResponse: {
              updateTodoById: {
                __typename: 'RegistertodoPayload',
                todo: { 
                    __typename: 'Todo',
                    id: todo.id,
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
                      id: todo.userByCreatorid.id,
                      firstname: todo.userByCreatorid.firstname,
                      lastname: todo.userByCreatorid.lastname
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
            update: (store, { data: { updateTodoById } }) => {
              // Read the data from the cache for this query.
              const data = store.readQuery({query: todosListQuery, variables: { sortCriteria: sortCriteria } });
              let currentTodo = data.allTodos.nodes.find((n) => n.id === updateTodoById.todo.id);
              if (currentTodo) {
                //NOTE: we are using a temporary negative id in order to let the UI know this
                //is an optimistic update, but this could have some colateral problems, for instance:
                //let say the UI was showing todos sorted by id at the moment of the update, this mean
                //the real id of the todo is going to be temporary replaced by the negative id and the todo will lose
                //its current position of the list 
                currentTodo = Object.assign(currentTodo, updateTodoById.todo, { __typename: 'Todo', id: Math.round(Math.random() * -1000000) });
              }
              // Write the data back to the cache.
              store.writeQuery({ query: todosListQuery, variables: { sortCriteria: sortCriteria }, data });
              if(typeof onAdd === 'function') {
                onUpdate();
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
          })
          .then(res => {
              if(typeof onUpdate === 'function') {
                onUpdate();
              }
          });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Update" primary={true} disabled={disabled}
            onClick={onUpdateClick} />
}

const UpdateTodoButton = graphql(updateTodoMutation)(UpdateTodoButtonTemplate);
export default UpdateTodoButton;