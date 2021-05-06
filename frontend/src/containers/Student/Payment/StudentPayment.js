import React, { Component } from 'react'
import './StudentPayment.css';
import Table from '../../../components/Table/Table';
import MOCK_DATA from './MOCK.json';
export class StudentPayment extends Component {
    render() {
        return (
            <div class="student-payment">
                <Table data={MOCK_DATA} payment={true}></Table>
            </div>
        )
    }
}

export default StudentPayment
