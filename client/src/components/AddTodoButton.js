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
              if(typeof onAdd === 'function') {
                onAdd();
              }
          });
    }

    return <RaisedButton className={'todo-editor-toolbar-button'} 
            label="Add" primary={true} 
            onClick={onAddClick} />
}

const AddTodoButton = graphql(addTodoMutation)(AddTodoButtonTemplate);
export default AddTodoButton;