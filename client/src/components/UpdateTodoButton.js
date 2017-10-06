import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import { todosListQuery, updateTodoMutation } from '../data/Todos';

const UpdateTodoButtonTemplate = ({mutate, onUpdate, todo}) => {

    const onUpdateClick = () => {

        mutate({
            variables: {
              input: {
                  id: todo.id,
                  todoPatch: {
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    statusid: todo.statusId,
                    priorityid: todo.priorityId,
                    ownerid: todo.ownerId,
                    creatorid: todo.creatorId,
                    duedate: `${todo.duedate.getFullYear()}-${todo.duedate.getMonth() + 1}-${todo.duedate.getDate()}`
                  }
              }
            },
            refetchQueries: [ { query: todosListQuery }]
          })
          .then(res => {
              if(typeof onUpdate === 'function') {
                onUpdate();
              }
          });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Update" primary={true} 
            onClick={onUpdateClick} />
}

const UpdateTodoButton = graphql(updateTodoMutation)(UpdateTodoButtonTemplate);
export default UpdateTodoButton;