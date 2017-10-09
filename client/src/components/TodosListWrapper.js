import React from 'react';
import Paper from 'material-ui/Paper';
import TodosList from '../components/TodosList';
import RaisedButton from 'material-ui/RaisedButton';

const TodosListWrapper = () => {

    return  <Paper style={style.todosList}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={'Todos'} />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                    <RaisedButton className={'todo-editor-toolbar-button'} label="Sort" primary={true} onClick={this.onSortClick.bind(this)} />
                    </ToolbarGroup>
                </Toolbar>
                <TodosList onItemClick={this.onItemClick.bind(this)} />
            </Paper>
}

export default TodosListWrapper;