import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { userListQuery } from '../data/Users';

class UsersSelectFieldTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.ownerId || null
        };
    }

    handleChange (event, index, value) {
        this.setState({
            userId: value
        });
        if(typeof this.props.onChange === 'function') {
            const { nodes } = this.props.data.allUsers;
            const node = nodes.find(p => p.id === value);
            this.props.onChange(node);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ userId: nextProps.value });
    }

    render () {
        const { data: {loading, error, allUsers } } = this.props;
        if (loading) {
            return <p>Loading ...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return  <SelectField disabled={this.props.disabled} value={this.state.userId} name={this.props.name} 
                            floatingLabelText={this.props.floatingLabelText} hintText={this.props.hintText} 
                            onChange={this.handleChange.bind(this)}>
                    { allUsers.nodes.map(u => <MenuItem key={u.id} value={u.id} primaryText={u.firstname + ' ' + u.lastname} />) }
                </SelectField>;
    }
}

const UsersSelectField = graphql(userListQuery)(UsersSelectFieldTemplate);
export default UsersSelectField;