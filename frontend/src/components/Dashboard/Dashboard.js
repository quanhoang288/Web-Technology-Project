import React, { Component } from 'react'
import DataTables from '../Table/Table'
import MOCK_DATA from '../Table/MOCK.json'
export class Dashboard extends Component {
    render() {
        return (
            <div>
                <DataTables data={MOCK_DATA}></DataTables>
            </div>
        )
    }
}

export default Dashboard
