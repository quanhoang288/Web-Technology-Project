import React, { Component } from 'react';
import './Registration.css'
import axios from 'axios'
import { HOST_URL } from '../../config'

class Registration extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        workplace: '',
        phone: '',

    }
    fieldOnChangeHandler = (field, e) => {

        this.setState({ [`${field}`]: e.target.value })

    }
    onSubmit = (e) => {
        e.preventDefault()
        var data = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });

        var config = {
            method: 'post',
            url: `${HOST_URL}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
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
                description: 'Email', type: 'email', field: 'email', required: true
            },
            {
                description: 'Password', type: 'text', field: 'password', required: true
            },
            {
                description: 'Workplace', type: 'text', field: 'workplace', required: true
            },
            {
                description: 'Phone number', type: 'tel', field: 'phone', required: true
            }
        ]


        return (
            <div className="container">
                <div className="wrapper-register">
                    <div className="title">
                        Sign up!</div>
                    <form action="#">

                        {field.map((elm, idx) => {
                            if (elm.type === 'tel') {
                                return (
                                    <div className='field' key={idx}>

                                        <input type={elm.type} required={elm.required}  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e) => { this.fieldOnChangeHandler(elm.field, e) }} ></input>
                                        <label>{elm.description}</label>
                                    </div>
                                )
                            }
                            return (
                                genCustomInput(idx, elm.description, elm.type, elm.field, elm.required)
                            )

                        })}
                        <div className="field">
                            <input type="submit" value="Register" />
                        </div>

                    </form>
                </div>
            </div>

        );
    }
}

export default Registration;