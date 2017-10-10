import React, { Component } from 'react';
import { List } from 'material-ui/List';
import TodoItem from '../components/TodoItem';
import Divider from 'material-ui/Divider';
import { todosListQuery } from '../data/Todos';
import { graphql } from 'react-apollo';

class TodosList extends Component {

    onListItemClick = (todo) => {
        if(typeof this.props.onItemClick === 'function') {
            this.props.onItemClick(todo);
        }
    }

    render () {
        const { data: {loading, error, allTodos } } = this.props;
        if (loading) {
            return <p>Loading ...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return  <List className={'todos-list'}>
                    <Divider />
                    { allTodos.nodes.map(todo => <TodoItem key={todo.id} todo={todo} onClick={this.onListItemClick.bind(this)} />) }
                </List>;
    }
}

export default graphql(todosListQuery, {
    options: ({sortCriteria}) => ({
      variables: { sortCriteria: sortCriteria },
      fetchPolicy: 'network-only'
    }),
})(TodosList);