import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import TodosList from '../components/TodosList';
import TodoEditor from '../components/TodoEditor';
import SortingTodosMenu from '../components/SortingTodosMenu';
import { getEmptyTodo } from '../data/Todos';

const style = {
    grid: {
        display:'-webkit-box',
    },
    todosList: {
        margin: 20,
        width: 700
    },
    sortMenuTitle: {
        marginTop: 5,
        fontSize: 15
    }
};

class TodosViewTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortCriteria: 'DUEDATE_ASC',
            lastChangeDate: null,
            todo: getEmptyTodo()
        };
    }

    onItemClick = (todo) => {
        this.setState({ todo: todo });
    }

    onSortChange = (sortCriteria) => {
        this.setState({ sortCriteria: sortCriteria });
    }

    render () {
        return (
            <div style={style.grid}>
                <div>
                    <Paper style={style.todosList}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text={'Todos'} />
                            </ToolbarGroup>
                            <ToolbarGroup lastChild={true}>
                                <ToolbarTitle text="Sort by" style={style.sortMenuTitle} />
                                <SortingTodosMenu value={this.state.sortCriteria} onSortChange={this.onSortChange.bind(this)} />
                            </ToolbarGroup>
                        </Toolbar>
                        <TodosList onItemClick={this.onItemClick.bind(this)} sortCriteria={this.state.sortCriteria} />
                    </Paper>
                </div>
                <div>
                    <TodoEditor id={this.state.todo.id}
                                title={this.state.todo.title} 
                                description={this.state.todo.description}
                                duedate={this.state.todo.duedate} 
                                priorityByPriorityid={this.state.todo.priorityByPriorityid}
                                userByOwnerid={this.state.todo.userByOwnerid}
                                userByCreatorid={this.state.todo.userByCreatorid}
                                todostatusByStatusid={this.state.todo.todostatusByStatusid}
                                sortCriteria={this.state.sortCriteria}
                                userId={1} 
                                />
                </div>
            </div>);
    }
}

export default TodosViewTemplate;