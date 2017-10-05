import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { graphUri } from './config';
import TodosView from './views/Todos';
import TodoEditorView from './views/TodoEditor';
import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarComponent from './components/AppBar';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ 
    uri: graphUri
  })
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div className="App">
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              <AppBarComponent />
              <Switch>
                <Route exact path="/" component={TodosView}/>
                <Route path="/newtodo/" component={TodoEditorView}/>
                <Route component={ NotFound }/>
              </Switch>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
