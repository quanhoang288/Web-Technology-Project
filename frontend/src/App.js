import React, { Component } from 'react';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute'
import Layout from './hoc/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Registration/Registration'
<<<<<<< HEAD
import Sidebar from './components/Sidebar/Sidebar'
import News from'./components/news/News'
=======
>>>>>>> 32c4586fb43d79a1431f64a81b00166059bf6f8c

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";

import AdminDashboard from './containers/Admin/AdminDashboard/AdminDashboard'
import StudentManagement from './containers/Admin/StudentManagement/StudentManagement'
import TeacherManagement from './containers/Admin/TeacherManagement/TeacherManagement'
import StudentInfo from './containers/Student/StudentInfo/StudentInfo'
import StudentCourse from './containers/Student/StudentCourse/StudentCourse'
import Assignment from './containers/Student/Assignment/Assignment'
import { connect } from 'react-redux'


class App extends Component {
<<<<<<< HEAD
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
=======
  render() {
    return (
      <Router>
        <Layout permission={this.props.user !== null ? this.props.user.role : 'default'}>

          <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            {/* <Route path='/dashboard' exact component={Register}></Route> */}
            
            <Route

              path="/"
              exact
              render={({ match: { url } }) => {
                return (
                  <>
                    {
                      this.props.user !== null ?
                        <Redirect to={`${this.props.user.role}`} />
                        : null
                    }

                  </>
                )
              }}
            />

            {/* admin routes */}
            <Route

              path="/admin"

              render={({ match: { url } }) => {
                const permission = 'admin'
                return (
                  <>
                    {/* default route */}


                    <PrivateRoute exact permission={permission} path={`${url}/dashboard`} component={AdminDashboard} />
                    <PrivateRoute exact permission={permission} path={`${url}/manage/students`} component={StudentManagement} />
                    <PrivateRoute exact permission={permission} path={`${url}/manage/teachers`} component={TeacherManagement} />

                  </>
                )
              }}
            />

            {/* teacher routes */}
            <Route  

              path="/teacher"

              render={({ match: { url } }) => {
                const permission = 'teacher'
                return (
                  <>


                    <PrivateRoute exact permission={permission} path={`${url}/dashboard`} component={AdminDashboard} />

                  </>
                )
              }}
            />
            {/* student routes */}
            <Route  

              path="/student"

              render={({ match: { url } }) => {
                const permission = 'student'
                return (
                  <>


                    <PrivateRoute exact permission={permission} path={`${url}/info`} component={StudentInfo} />
                    <PrivateRoute exact permission={permission} path={`${url}/courses`} component={StudentCourse} />
                    <PrivateRoute exact permission={permission} path={`${url}/assignment`} component={Assignment} />

                  </>
                )
              }}
            />

          </Switch>

        </Layout>

>>>>>>> 32c4586fb43d79a1431f64a81b00166059bf6f8c
      </Router>
    );

  }
}









const mapState = (state) => {
  return (
    {
      user: state.authReducer.user
    }
  )
}

export default connect(mapState)(App)

