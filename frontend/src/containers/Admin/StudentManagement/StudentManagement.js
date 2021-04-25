import React, { Component } from 'react'
import DataTables from '../../../components/Table/Table'
import MOCK_DATA from '../../../components/Table/MOCK.json'
export class StudentManagement extends Component {
    render() {
        return (
            <div>
                <DataTables data={MOCK_DATA}></DataTables>
            </div>
        )
    }
}

export default StudentManagement
