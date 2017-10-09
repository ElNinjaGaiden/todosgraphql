import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, deleteTodoMutation } from '../data/Todos';

const DeleteTodoButtonTemplate = ({mutate, onDelete, todoId, sortCriteria}) => {

    const onDeleteClick = () => {
        mutate({
            variables: {
              input: {
                id: todoId
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
              if(typeof onDelete === 'function') {
                  onDelete();
              }
          });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Delete" secondary={true} 
            onClick={onDeleteClick} />
}

const DeleteTodoButton = graphql(deleteTodoMutation)(DeleteTodoButtonTemplate);
export default DeleteTodoButton;