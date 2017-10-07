import React from 'react';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const styles = {
    tabsContainer: {
        height: '100vh',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
};

const LoginView = () => (
    <div style={styles.tabsContainer}>
        {/* <Paper  style={{margin: 40, width: 500, height:400}}> */}
            <Tabs>
                <Tab label={"Login"}>
                    <form>
                        <TextField hintText="User" floatingLabelText="User" fullWidth={true} />
                        <TextField type="password" hintText="Password" floatingLabelText="Password" fullWidth={true} />
                    </form>
                </Tab>
                <Tab label={"Register"}></Tab>
            </Tabs>
        {/* </Paper> */}
    </div>
)

export default LoginView;