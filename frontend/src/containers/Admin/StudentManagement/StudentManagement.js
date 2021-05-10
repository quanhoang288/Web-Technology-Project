import React, { Component } from 'react'
import DataTables from '../../../components/Table/Table'
import MOCK_DATA from '../../../components/Table/MOCK.json'

import Modal from '../../../components/Modal/Modal'
import './StudentManagement.css'
export class StudentManagement extends Component {
    state = {
        modalShow: false,
        targetRow: {},

    }
    toggleModal = () => {
        this.setState({ modalShow: !this.state.modalShow })
        this.setState({targetRow:{}})
    }
    editHander = (target_row) => {
        this.toggleModal()
        this.setState({ targetRow: target_row })
    }

    onSubmit = () => {
        console.log("Handle update request")
    }
    render() {

        return (
            <div>
                <h1 className='title'>Student Management</h1>

                <DataTables
                    data={MOCK_DATA}
                    rowPerPage={5}
                    editHander={this.editHander}
                ></DataTables>


                <div className={this.state.modalShow ? 'back-drop' : null}></div>
                <Modal show={this.state.modalShow} closeHandler={this.toggleModal}
                    info={
                        this.state.targetRow
                    }></Modal>
            </div>
        )
    }
}

export default StudentManagement
