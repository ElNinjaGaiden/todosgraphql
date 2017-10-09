import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class SortingTodosMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    handleChange = (event, index, value) => {
        this.setState({value});
        if(typeof this.props.onSortChange === 'function') {
            this.props.onSortChange(value);
        }
    };

    render = () => {

        return  <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                    <MenuItem value={"ID_ASC"} primaryText={"Id ASC"} />
                    <MenuItem value={"ID_DESC"} primaryText={"Id DESC"} />
                    <MenuItem value={"PRIORITYID_ASC"} primaryText={"Priority ASC"} />
                    <MenuItem value={"PRIORITYID_DESC"} primaryText={"Priority DESC"} />
                    <MenuItem value={"STATUSID_ASC"} primaryText={"Status ASC"} />
                    <MenuItem value={"STATUSID_DESC"} primaryText={"Status DESC"} />
                    <MenuItem value={"CREATEDON_ASC"} primaryText={"Creation date ASC"} />
                    <MenuItem value={"CREATEDON_DESC"} primaryText={"Creation date DESC"} />
                    <MenuItem value={"DUEDATE_ASC"} primaryText={"Due date ASC"} />
                    <MenuItem value={"DUEDATE_DESC"} primaryText={"Due date DESC"} />
                </DropDownMenu>
    }
}