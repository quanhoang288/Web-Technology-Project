import React, { Component } from 'react';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute'
import Layout from './hoc/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Registration/Registration'

import HomePage from './containers/Homepage/HomePage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";

import AdminDashboard from './containers/Admin/AdminDashboard/AdminDashboard'
import StudentManagement from './containers/Admin/StudentManagement/StudentManagement'
import TeacherManagement from './containers/Admin/TeacherManagement/TeacherManagement'
import CourseManagement from './containers/Admin/CourseManagement/CourseManagement'
import StudentInfo from './containers/Student/StudentInfo/StudentInfo'
import StudentCourse from './containers/Student/StudentCourse/StudentCourse'
import Assignment from './containers/Student/Assignment/Assignment'
import { connect } from 'react-redux'


class App extends Component {
  render() {
    return (
      <Router>
        <Layout permission={this.props.user !== null ? this.props.user.role : 'default'}>

          <Switch>
            
            <Route path='/login' exact component={Login}></Route>
            <Route path='/register' exact component={Register}></Route>
            <Route

              path="/"
              exact
              render={({ match: { url } }) => {
                
                return (
                  <>
                    {
                      this.props.user !== null ?
                        <Redirect to={`${this.props.user.role}`} />
                        : <HomePage></HomePage>
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
                    <PrivateRoute exact permission={permission} path={`${url}/manage/courses`} component={CourseManagement} />

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

