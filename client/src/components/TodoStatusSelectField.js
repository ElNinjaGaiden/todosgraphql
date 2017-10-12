import React from 'react';
import SelectField from 'material-ui/SelectField';
import { graphql } from 'react-apollo';
import MenuItem from 'material-ui/MenuItem';
import { TodosStatusesListQuery } from '../data/TodosStatus';

class TodoStatusSelectFieldTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statusId: this.props.statusId || null
        };
    }

    handleChange (event, index, value) {
        this.setState({
            statusId: value
        });
        if(typeof this.props.onChange === 'function') {
            const { nodes } = this.props.data.allTodostatuses;
            const node = nodes.find(p => p.id === value);
            this.props.onChange(node);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ statusId: nextProps.value });
    }

    render = () => {
        const { data: {loading, error, allTodostatuses } } = this.props;
        if (loading) {
            return <p>Loading ...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return  <SelectField value={this.state.statusId} floatingLabelText="Status" hintText="Status" onChange={this.handleChange.bind(this)}>
                    { allTodostatuses.nodes.map(u => <MenuItem key={u.id} value={u.id} primaryText={u.name} />) }
                </SelectField>;
    }
}

const TodoStatusSelectField = graphql(TodosStatusesListQuery)(TodoStatusSelectFieldTemplate);
export default TodoStatusSelectField;