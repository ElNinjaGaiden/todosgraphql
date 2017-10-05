import React from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { red500, yellow500, greenA700 } from 'material-ui/styles/colors';

const style = {
    todo: {
        details: {
            height: 'auto',
            fields: {
                display:'-webkit-box'
            }
        }
    }
};

const TodoItem = ({ todo, onClick }) => {

    const handleClick = (event) => {
        if(typeof onClick === 'function') {
            onClick(todo);
        }
    };

    const priorityColor = todo.priorityByPriorityid.id === 1 ? greenA700 : (todo.priorityByPriorityid.id === 2 ? yellow500 : red500);
    return (
        <div>
            <ListItem onClick={handleClick.bind(this)} key={todo.id} primaryText={<p className={'todo-details-title'}>{todo.title}</p>} secondaryText={
                <div style={style.todo.details}>
                    <p className={'todo-details-description'}>{todo.description}</p>
                    <div style={style.todo.details.fields} className={'todo-details-fields'}>
                        <div className={'todo-details-fields-col'}>
                            <div className={'todo-details-field-header'}>Status:</div>
                            <div>{todo.todostatusByStatusid.name}</div>
                            <div className={'todo-details-field-header'}>Priority:</div>
                            <div style={{color: priorityColor}}>{todo.priorityByPriorityid.name}</div>
                        </div>
                        <div className={'todo-details-fields-col'}>
                            <div className={'todo-details-field-header'}>Owner:</div>
                            {
                                todo.userByOwnerid ? <div>{todo.userByOwnerid.firstname} {todo.userByOwnerid.lastname}</div> : <div>Not assigned</div>
                            }
                            <div className={'todo-details-field-header'}>Due date:</div>
                            <div >{todo.duedate}</div>
                        </div>
                        <div className={'todo-details-fields-col'}>
                            <div className={'todo-details-field-header'}>Created by:</div>
                            <div>{todo.userByCreatorid.firstname} {todo.userByCreatorid.lastname}</div>
                            <div className={'todo-details-field-header'}>Created on:</div>
                            <div>{new Date(todo.createdon).toDateString()}</div>
                        </div>
                    </div>
                </div>
                } >
            </ListItem>
            <Divider />
        </div>
    )
};

export default TodoItem;