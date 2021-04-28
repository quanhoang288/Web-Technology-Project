import React, { Component } from 'react';
import './Registration.css'
import axios from 'axios'
import { HOST_URL } from '../../config'
import { Redirect } from 'react-router';

class Registration extends Component {
    state = {
        user_info:
        {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            role: 'student',
            school: '',
            phone: '',
        },
        success: false


    }
    fieldOnChangeHandler = (field, e) => {
        const user = { ...this.state.user_info }
        user[`${field}`] = e.target.value
        this.setState({ 'user_info': user })

    }

    onSubmit = (e) => {
        e.preventDefault()
        const { username, password, firstname, lastname, role, school, phone } = this.state.user_info
        var data = JSON.stringify({
            "username": username,
            "password": password,
            'firstname': firstname,
            'lastname': lastname,
            'school': school,
            'phone': phone,
            'role': role
        });


        var config = {
            method: 'post',
            url: `${HOST_URL}/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(res => {
                alert(res.data.message)

                if (res.data.code === 400) {

                }
                else {

                    this.setState({ 'success': true })
                }
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {



        const genCustomInput = (key, description, type, field, required) => {
            return (

                <div className='field' key={key}>

                    <input type={type} required={required} onChange={(e) => { this.fieldOnChangeHandler(field, e) }} ></input>
                    <label>{description}</label>
                </div>



            )
        }
        const field = [
            {
                description: 'Username', type: 'text', field: 'username', required: true
            },
            {
                description: 'Password', type: 'text', field: 'password', required: true
            },
            {
                description: 'Firstname', type: 'text', field: 'firstname', required: true
            },
            {
                description: 'Lastname', type: 'text', field: 'lastname', required: true
            },
            {
                description: 'Workplace', type: 'text', field: 'school', required: true
            },
            {
                description: 'Phone number', type: 'tel', field: 'phone', required: true
            }
        ]




        return (
            <React.Fragment>
                {!this.state.success ?
                    <div className="container">
                        <div className="wrapper-register">
                            <div className="title">
                                Sign up!</div>
                            <form onSubmit={this.onSubmit}>

                                {field.map((elm, idx) => {
                                    if (elm.type === 'tel') {
                                        return (
                                            <div className='field' key={idx}>

                                                <input type={elm.type} required={elm.required} onChange={(e) => { this.fieldOnChangeHandler(elm.field, e) }} ></input>
                                                <label>{elm.description}</label>
                                            </div>
                                        )
                                    }
                                    return (
                                        genCustomInput(idx, elm.description, elm.type, elm.field, elm.required)
                                    )

                                })}
                                <select onChange={(e) => this.fieldOnChangeHandler('role', e)}>
                                    <option value="student" >Student</option>
                                    <option value="teacher" >Teacher</option>

                                </select>
                                <div className="field">
                                    <input type="submit" value="Register" />
                                </div>

                            </form>
                        </div>
                    </div>
                    :
                    <Redirect to='/login'></Redirect>
                }


            </React.Fragment>


        );
    }
}

export default Registration;