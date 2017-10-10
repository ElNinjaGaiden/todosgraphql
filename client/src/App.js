import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { graphUri } from './config';
import TodosView from './views/Todos';
import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarComponent from './components/AppBar';

const networkInterface = createNetworkInterface({ 
  uri: graphUri
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 1000);
  },
}]);

const client = new ApolloClient({
  networkInterface: networkInterface//,
  // dataIdFromObject: (o) => {
  //   console.log(o.__typename);
  //   return `${o.__typename}:${o.id}`;
  // }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div className="App">
              <AppBarComponent />
              <Switch>
                <Route exact path="/" component={TodosView}/>
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
