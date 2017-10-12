import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import PrioritiesSelectField from '../components/PrioritiesSelectField';
import UsersSelectField from '../components/UsersSelectField';
import TodoStatusSelectField from '../components/TodoStatusSelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import AddTodoButton from '../components/AddTodoButton';
import DeleteTodoButton from '../components/DeleteTodoButton';
import UpdateTodoButton from '../components/UpdateTodoButton';
import { userByIdQuery } from '../data/Users';
import { graphql } from 'react-apollo';
import { getEmptyTodo } from '../data/Todos';

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
    this.state = getEmptyTodo();
    this.state = Object.assign(this.state, this.validateData());
  }

  componentWillReceiveProps(nextProps) {
    const newTodo = Object.assign(this.state, nextProps);
    if(typeof newTodo.duedate === 'string') {
      const duedateparts = nextProps.duedate.split('-');
      newTodo.dueDate = new Date(parseInt(duedateparts[0], 10), parseInt(duedateparts[1], 10) - 1, parseInt(duedateparts[2], 10));
    }
    //console.log('Ojo', nextProps, newTodo);
    this.setState(newTodo, () => {
      this.setState(Object.assign({}, this.state, this.validateData()));
    });
  }

  render () {
    const { data: {loading, error, userById } } = this.props;
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return (
      <Paper style={style.paperStyle} zDepth={2}>
        <form >
          <Toolbar>
            <ToolbarGroup>
            <ToolbarTitle text="Todo Details" />
            </ToolbarGroup>
          </Toolbar>
            <div style={style.formStyle}>

              <TextField errorText={this.state.titleError}
                          name={"title"} hintText={"Title"} floatingLabelText={"Title"} 
                          fullWidth={true} value={this.state.title} 
                          onChange={this.handleInput.bind(this)} />

              <TextField errorText={this.state.descriptionError} 
                          hintText={"Description"} name={"description"} 
                          floatingLabelText={"Description"} multiLine={true} 
                          rows={2} fullWidth={true} value={this.state.description} 
                          onChange={this.handleInput.bind(this)}/>
              <br />

              <DatePicker required={true} hintText={"Due Date"} 
                          errorText={this.state.dueDateError}
                          name={"dueDate"} floatingLabelText={"Due Date"} 
                          value={this.state.dueDate} 
                          onChange={this.handleDueDate.bind(this)} autoOk={true} />

              <PrioritiesSelectField errorText={this.state.priorityError}
                                      name={"priorityId"} required={true} 
                                      value={this.state.priorityByPriorityid ? this.state.priorityByPriorityid.id : null} 
                                      onChange={this.handlePriority.bind(this)} />

              <UsersSelectField name={"ownerId"} required={true} floatingLabelText={"Owner"} hintText={"Owner"}
                                value={this.state.userByOwnerid ? this.state.userByOwnerid.id : null} 
                                onChange={this.handleOwner.bind(this)} />
              {
                this.state.id && <TodoStatusSelectField required={true} name={"statusId"} 
                                                        onChange={this.handleStatus.bind(this)}
                                                        statusError={this.state.statusError}
                                                        value={this.state.todostatusByStatusid.id} />
              }
            </div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup lastChild={true}>
              <RaisedButton className={'todo-editor-toolbar-button'} label="Clear" 
                            primary={true} onClick={this.onClearClick.bind(this)} />
              {
                this.state.id && <DeleteTodoButton todoId={this.state.id} 
                                                    onDelete={this.onDelete.bind(this)} 
                                                    sortCriteria={this.props.sortCriteria} />
              }
              {
                !this.state.id && userById && <AddTodoButton onAdd={this.onAdd.bind(this)} 
                                                  todo={this.state} user={userById} 
                                                  disabled={!this.state.isValid}
                                                  sortCriteria={this.props.sortCriteria} />
              }
              {
                this.state.id && <UpdateTodoButton  onUpdate={this.onUpdate.bind(this)} 
                                                    todo={this.state} disabled={!this.state.isValid}
                                                    sortCriteria={this.props.sortCriteria} />
              }
            </ToolbarGroup>
          </Toolbar>
        </form>
      </Paper>
    )
  }

  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {
      this.setState(Object.assign({}, this.state, this.validateData()));
    });
  }

  validateData = () => {
    let validationData = {
      titleError: !this.state.title && 'Required',
      descriptionError: !this.state.description && 'Required',
      dueDateError: !this.state.dueDate && 'Required',
      priorityError: !this.state.priorityByPriorityid && 'Required',
      statusError: !this.state.todostatusByStatusid && 'Required'
    };

    return Object.assign(validationData, {
      isValid: !validationData.titleError && 
                !validationData.descriptionError && 
                !validationData.dueDateError && 
                !validationData.priorityError &&
                !validationData.statusError
    });
  }

  handlePriority(priority) {
    this.setState({priorityByPriorityid: priority});
    this.handleInput({
      target: {
        name: 'priorityByPriorityid',
        value: priority
      }
    });
  }

  handleOwner(owner) {
    this.setState({userByOwnerid: owner});
    this.handleInput({
      target: {
        name: 'userByOwnerid',
        value: owner
      }
    });
  }

  handleStatus(status) {
    this.setState({todostatusByStatusid: status});
    this.handleInput({
      target: {
        name: 'todostatusByStatusid',
        value: status
      }
    });
  }

  handleDueDate = (event, date) => {
    this.handleInput({
      target: {
        name: 'dueDate',
        value: date
      }
    });
  }

  onAdd = () => {
    this.onClearClick();
  }

  onClearClick = () => {
    this.setState(getEmptyTodo(), () => {
      this.setState(Object.assign(this.state, this.validateData()));
    });
  }

  onDelete = () => {
    this.onClearClick();
  }

  onUpdate = () => {
  }
}

export default graphql(userByIdQuery, {
  options: ({userId}) => ({
    variables: { id: userId }
  }),
})(TodoEditor);
