import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, deleteTodoMutation } from '../data/Todos';

const DeleteTodoButtonTemplate = ({ mutate, onDelete, todoId, sortCriteria }) => {

    const onDeleteClick = () => {
        mutate({
            variables: {
              input: {
                id: todoId
              }
            },
            optimisticResponse: {
                deleteTodoById: {
                    __typename: 'DeleteTodoPayload',
                    todo: {
                        __typename: 'Todo',
                        id: todoId
                    }
                }
            },
            update: (store, { data: { deleteTodoById } }) => {
                const data = store.readQuery({query: todosListQuery, variables: { sortCriteria: sortCriteria } });
                const { nodes } = data.allTodos;
                const nodeIndex = nodes.findIndex(n => n.id === deleteTodoById.todo.id);
                if(nodeIndex !== -1) {
                    nodes.splice(nodeIndex, 1);
                    store.writeQuery({ query: todosListQuery, variables: { sortCriteria: sortCriteria }, data });
                    if(typeof onDelete === 'function') {
                        onDelete();
                    }
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
        //   .then(res => {
        //       if(typeof onDelete === 'function') {
        //           onDelete();
        //       }
        //   });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Delete" secondary={true} 
            onClick={onDeleteClick} />
}

const DeleteTodoButton = graphql(deleteTodoMutation)(DeleteTodoButtonTemplate);
export default DeleteTodoButton;