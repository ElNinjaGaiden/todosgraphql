import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, addTodoMutation } from '../data/Todos';

const AddTodoButtonTemplate = ({mutate, onAdd, todo, sortCriteria}) => {
  
    const onAddClick = () => {
        mutate({
            variables: {
                todo: {
                  ownerid: todo.ownerId,
                  title: todo.title,
                  description: todo.description,
                  priorityid: todo.priorityId,
                  statusid: todo.statusId,
                  creatorid: todo.creatorId,
                  duedate: `${todo.duedate.getFullYear()}-${todo.duedate.getMonth() + 1}-${todo.duedate.getDate()}`
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
                    priorityid: todo.priorityId,
                    statusid: todo.statusId,
                    creatorid: todo.creatorId,
                    createdon: new Date().toISOString(),
                    duedate: `${todo.duedate.getFullYear()}-${todo.duedate.getMonth() + 1}-${todo.duedate.getDate()}`,
                    todostatusByStatusid: {
                      __typename: 'Todostatus',
                      id: todo.statusId,
                      name: ''
                    },
                    priorityByPriorityid: {
                      __typename: 'Priority',
                      id: todo.priorityId,
                      name: ''
                    },
                    userByCreatorid: {
                      __typename: 'User',
                      id: todo.creatorId,
                      firstname: '',
                      lastname: ''
                    },
                    userByOwnerid: todo.ownerId && {
                      __typename: 'User',
                      id: todo.ownerId,
                      firstname: '',
                      lastname: ''
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
            label="Add" primary={true} 
            onClick={onAddClick} />
}

const AddTodoButton = graphql(addTodoMutation)(AddTodoButtonTemplate);
export default AddTodoButton;