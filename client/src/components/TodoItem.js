import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { red500, yellow500, greenA700, grey400 } from 'material-ui/styles/colors';
import noAvatar from '../NoAvatar.jpg';

const style = {
    todo: {
        details: {
            height: 'auto',
            fields: {
                display:'-webkit-box'
            },
            innerDiv: {
                paddingLeft: 80
            },
            avatar: {
                width: 50,
                height: 50,
                left: 11,
                top: 35
            }
        }
    }
};

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: this.resolveAvatar()
        };
    }

    handleClick = (event) => {
        if(typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.todo);
        }
    };

    resolveAvatar = () => {
        if(this.props.todo.userByOwnerid) {
            const rand = Math.floor(Math.random() * 100) + 1;
            const genderFlag = Math.random() >= 0.5;
            const gender = genderFlag ? 'women' : 'men';
            const avatar = `https://randomuser.me/api/portraits/${gender}/${rand}.jpg`;
            return avatar;
        }
        return noAvatar;
    }

    render = () => {
        const { todo } = this.props;
        const priorityColor = todo.priorityByPriorityid.id === 1 ? greenA700 : (todo.priorityByPriorityid.id === 2 ? yellow500 : red500);
        return (
            <div>
                <ListItem onClick={this.handleClick.bind(this)} key={todo.id} 
                    primaryText={
                    <div className={'todo-details-title'}>
                        <p>{todo.title}</p>
                        <span className={'todo-details-id'} style={{color: grey400}}>#{todo.id}</span>
                    </div>
                    } 
                    leftAvatar={<Avatar src={this.state.avatar} style={style.todo.details.avatar} />}
                    innerDivStyle={style.todo.details.innerDiv}
                    secondaryText={
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
                <Divider inset={true} />
            </div>
        )
    }
}

export default TodoItem;