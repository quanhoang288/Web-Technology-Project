import React, { Component } from 'react';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute'
import Layout from './hoc/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Registration/Registration'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
class App extends Component {
  render() {
    return (
      <Router>
        <Layout />
        <Switch>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/register' exact component={Register}></Route>
          
          {/* admin routes */}
          <Route

            path="/admin"
            render={({ match: { url } }) => {
              const permission = 'admin'
              return (
                <>
                  <PrivateRoute permission={permission} path={`${url}/dashboard`} component={Dashboard} />
                </>
              )
            }}
          />


          {/* teacher routes */}


          {/* student routes */}
        </Switch>
      </Router>
    );

  }
}

export default App;
