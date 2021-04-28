import React, { Component } from 'react';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute'
import Layout from './hoc/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Registration/Registration'
import Sidebar from './components/Sidebar/Sidebar'
import News from'./components/news/News'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends Component {
    render() {
      return(
        <Router>
        <Layout/>
        <Switch>
          <Route path = '/login' exact component={Login}></Route>          
          <Route path = '/register' exact component={Register}></Route>
          <Route path = '/sidebar' exact component={Sidebar}></Route>
          <Route path = '/news' exact component={News}></Route>
        </Switch>
      </Router>
      );
      
    }
}

export default App;
