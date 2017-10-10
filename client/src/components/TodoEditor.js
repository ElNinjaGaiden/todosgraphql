import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import PrioritiesSelectField from '../components/PrioritiesSelectField';
import UsersSelectField from '../components/UsersSelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import AddTodoButton from '../components/AddTodoButton';
import DeleteTodoButton from '../components/DeleteTodoButton';
import UpdateTodoButton from '../components/UpdateTodoButton';

const style = {
  paperStyle: {
    margin: 20,
    width: 500
  },
  formStyle: {
    padding: 10
  }
};

class TodoEditor extends Component {

  constructor (props) {
    super(props);
    this.state = {
      todo: this.getEmptyTodo()
    };
  }

  getEmptyTodo = () => {
    return {
      id: null,
      creatorId: 1,
      createdOn: null,
      title: '',
      description: '',
      priorityId: null,
      statusId: 1,
      ownerId: null,
      duedate: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const newTodo = Object.assign({}, this.state.todo, nextProps);
    if(newTodo.duedate && typeof newTodo.duedate === 'string') {
      const duedateparts = nextProps.duedate.split('-');
      newTodo.duedate = new Date(parseInt(duedateparts[0]), parseInt(duedateparts[1]) - 1, parseInt(duedateparts[2]));
    }
    this.setState({todo: newTodo});
  }

  render () {
    return (
      <Paper style={style.paperStyle} zDepth={2}>
        <Toolbar>
          <ToolbarGroup>
          <ToolbarTitle text="Todo Details" />
          </ToolbarGroup>
        </Toolbar>
        <form style={style.formStyle}>
          <TextField hintText="Title" floatingLabelText="Title" fullWidth={true} value={this.state.todo.title} onChange={this.handleTitle.bind(this)} />
          <TextField hintText="Description" floatingLabelText="Description" multiLine={true} rows={2} fullWidth={true} value={this.state.todo.description} onChange={this.handleDescription.bind(this)}/>
          <br />
          <DatePicker hintText="Due Date" floatingLabelText="Due Date" value={this.state.todo.duedate} onChange={this.handleDueDate.bind(this)} autoOk={true} />
          <PrioritiesSelectField value={this.state.todo.priorityId} onChange={this.handlePriority.bind(this)} />
          <UsersSelectField value={this.state.todo.ownerId} onChange={this.handleOwner.bind(this)} />
        </form>
        <Toolbar>
          <ToolbarGroup firstChild={true} />
          <ToolbarGroup lastChild={true}>
            <RaisedButton className={'todo-editor-toolbar-button'} label="Clear" primary={true} onClick={this.onClearClick.bind(this)} />
            {
              this.state.todo.id && <DeleteTodoButton todoId={this.state.todo.id} onDelete={this.onDelete.bind(this)} sortCriteria={this.props.sortCriteria} />
            }
            {
              !this.state.todo.id && <AddTodoButton  onAdd={this.onAdd.bind(this)} todo={this.state.todo} sortCriteria={this.props.sortCriteria} />
            }
            {
              this.state.todo.id && <UpdateTodoButton onUpdate={this.onUpdate.bind(this)} todo={this.state.todo} sortCriteria={this.props.sortCriteria} />
            }
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    )
  }

  handleTitle(event) {
    const newTodo = Object.assign(this.state.todo, { title: event.target.value });
    this.setState({ todo: newTodo });
  }

  handleDescription(event) {
    const newTodo = Object.assign(this.state.todo, { description: event.target.value });
    this.setState({ todo: newTodo });
  }

  handlePriority(event, index, value) {
    const newTodo = Object.assign(this.state.todo, { priorityId: value });
    this.setState({ todo: newTodo });
  }

  handleOwner(event, index, value) {
    const newTodo = Object.assign(this.state.todo, { ownerId: value });
    this.setState({ todo: newTodo });
  }

  handleDueDate = (event, date) => {
    const newTodo = Object.assign(this.state.todo, { duedate: date });
    this.setState({ todo: newTodo });
  }

  onAdd = () => {
    this.onClearClick();
  }

  onClearClick = () => {
    this.setState({todo: this.getEmptyTodo()});
  }

  onDelete = () => {
    this.onClearClick();
  }

  onUpdate = () => {
  }
}

export default TodoEditor;
