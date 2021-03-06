import React, { Component } from "react";
import PrivateRoute from "./hoc/PrivateRoute/PrivateRoute";
import Layout from "./hoc/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Registration";

import HomePage from "./containers/Homepage/HomePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PasswordChange  from './components/PasswordChange/PasswordChange'
import AdminDashboard from "./containers/Admin/AdminDashboard/AdminDashboard";
import CreateAdminAccount from './containers/Admin/CreateAdminAccount/CreateAdminAccount'
import StudentManagement from "./containers/Admin/StudentManagement/StudentManagement";
import TeacherManagement from "./containers/Admin/TeacherManagement/TeacherManagement";
import CourseManagement from "./containers/Admin/CourseManagement/CourseManagement";
import CourseCreation from "./components/CourseCreation/CourseCreation";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import StudentInfo from "./containers/Student/StudentInfo/StudentInfo";
import StudentCourse from "./containers/Student/StudentCourse/StudentCourse";
import StudentCourseDetail from "./containers/Student/StudentCourseDetail/StudentCourseDetail";

import TeacherCourseDetail from "./containers/Teacher/TeacherCourseDetail/TeacherCourseDetail";
import TeacherCourse from './containers/Teacher/TeacherCourse/TeacherCourse'
import TeacherSchedule from './containers/Teacher/TeacherSchedule/TeacherSchedule'

import TeacherInfo from './containers/Teacher/TeacherInfo/TeacherInfo'
import Test from "./components/Test/Test";
import CoursePreview from './containers/Homepage/CoursePreview'
//#region import
import { connect } from "react-redux";
//#endregion
import "./App.css";
import Schedule from "./containers/Student/Schedule/Schedule";
import { CourseEdit } from "./components/CourseEdit/CourseEdit";
class App extends Component {
  render() {
    return (
      <Router>
        <Layout
          permission={
            this.props.user !== null ? this.props.user.role : "default"
          }
        >
          <Switch>
            <Route path="/test" exact component={Test}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/" exact component={HomePage}></Route>
            <Route path='/courses/:id' exact component={CoursePreview}></Route>

            {/* admin routes */}
            <Route
              path="/admin"
              render={({ match: { url } }) => {
                const permission = "admin";
                return (
                  <>
                    <Switch>
                    <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}`}
                        component={HomePage}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/students`}
                        component={StudentManagement}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/teachers`}
                        component={TeacherManagement}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/courses`}
                        component={CourseManagement}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/courses/new-course`}
                        component={CourseCreation}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/courses/edit-course/:id`}
                        component={CourseEdit}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/manage/courses/:id`}
                        component={CourseDetail}
                      />

                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/dashboard`}
                        component={AdminDashboard}
                      />
                      <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}/accounts`}
                        component={CreateAdminAccount}
                      />

                      <Redirect to={`/`}></Redirect>
                    </Switch>
                  </>
                );
              }}
            />
            {/* teacher routes */}
            <Route
              path="/teacher"
              render={({ match: { url } }) => {
                const permission = "teacher";
                return (
                  <>
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/courses`}
                      component={TeacherCourse}
                    />
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/change-password`}
                      component={PasswordChange}
                    />
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/info`}
                      component={TeacherInfo}
                    />
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/courses/:id`}
                      component={TeacherCourseDetail}
                    />
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/schedule`}
                      component={TeacherSchedule}
                    />
                    <Redirect to = {`${url}/courses`}></Redirect>
                  </>
                );
              }}
            />

            {/* student routes */}
            <Route
              path="/student"
              render={({ match: { url } }) => {
                const permission = "student";
                return (
                  <Switch>
                    <PrivateRoute
                        exact
                        permission={permission}
                        path={`${url}`}
                        component={HomePage}
                      />
                    <PrivateRoute
                      exact
                      permission={permission}
                      path={`${url}/info`}
                      component={StudentInfo}
                    />
                    <PrivateRoute
                      exact
                      permission={permission}
                      path={`${url}/courses`}
                      component={StudentCourse}
                    />
                    <PrivateRoute
                      permission={permission}
                      exact
                      path={`${url}/change-password`}
                      component={PasswordChange}
                    />
                    <PrivateRoute
                      exact
                      permission={permission}
                      path={`${url}/courses/:id`}
                      component={StudentCourseDetail}
                    />
                    
                    <PrivateRoute
                      exact
                      permission={permission}
                      path={`${url}/schedule`}
                      component={Schedule}
                    />


                    <Redirect to={`/`}></Redirect>
                  </Switch>
                );
              }}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapState)(App);
