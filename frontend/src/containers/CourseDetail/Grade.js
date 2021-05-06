import React, { Component } from 'react';
import Table from '../../components/Table/Table';
import MOCK_DATA from '../../components/Table/MOCK.json';
export class Grade extends Component {
    render() {
        return(
        <Table data={MOCK_DATA}/>
        );
    }
}

export default Grade;