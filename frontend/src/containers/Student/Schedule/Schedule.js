import React, { Component } from 'react';
import Table from '../../../components/Table/Table';
import MOCK_DATA from './MOCK.json';

export class Schedule extends Component {
    render() {
        return (
            <div>
                <Table
                    data={MOCK_DATA}
                  
                ></Table>
            </div>
        )
    }
}

export default Schedule
