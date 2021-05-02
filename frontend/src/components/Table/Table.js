
import './Table.css'
import React, { Component } from 'react'
import Pagination, { } from '../Pagination/Pagination'

export class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            query_field: [],
            currentPage: 1,
        }
    }
    paginate = pageNumber => this.setState({ currentPage: pageNumber })
    componentDidMount() {
        //init query field 
        const columns = this.props.data[0] && Object.keys(this.props.data[0])
        const query_field = columns ? columns : []
        this.setState({ query_field: query_field })
    }

    rowClick = (row_data) => {
        
        this.props.editHander(row_data)
    }



    queryHandler = (e) => {

        this.setState({ query: e.target.value })
    }
    filterData = (data) => {
        const matchingIndex = []

        data.forEach((row, idx) => {
            let flag = true
            this.state.query_field.forEach((field) => {
                let match = String(row[field]).toLowerCase().indexOf(this.state.query.toLowerCase())
                if (match > -1 && flag) {
                    matchingIndex.push(idx)
                    flag = false
                }
            })
        }
        )
        return this.props.data.filter((_, idx) => {
            return matchingIndex.indexOf(idx) !== -1
        })

    }
    render() {
        const columns = this.props.data[0] && Object.keys(this.props.data[0])
        const indexOfLastPost = this.state.currentPage * this.props.rowPerPage;
        const indexOfFirstPost = indexOfLastPost - this.props.rowPerPage;
        const data = this.filterData(this.props.data)
        const currentRows = data.slice(indexOfFirstPost, indexOfLastPost);
        
        return (
            <div className='custom-table'>
                <div className='searchfield'>
                    <input required onChange={this.queryHandler}></input>
                    <label >Search</label>
                </div>
                <div className='hiddenCB'>
                    <div className='checkboxes'>
                        {
                            data[0] ?
                                columns.map((elm, idx) => {
                                    return (
                                        <div>
                                            <input id={idx} key={idx} type="checkbox" checked={this.state.query_field.includes(elm)}
                                                onChange={(e) => {
                                                    const checked = this.state.query_field.includes(elm)
                                                    const query_field = { ...this.state }.query_field
                                                    if (checked) {
                                                        query_field.splice(query_field.indexOf(elm), 1)
                                                    }
                                                    else {
                                                        query_field.push(elm)
                                                    }
                                                    this.setState({ query_field: query_field })
                                                }}
                                            />
                                            <label htmlFor={idx}>
                                                {elm}
                                            </label>
                                        </div>
                                    )
                                }) : null
                        }
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            {
                                data[0] ?
                                    columns.map((elm, idx) => {
                                        return (
                                            <th key={idx}>{elm}</th>
                                        )
                                    })
                                    : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows[0] ?
                            currentRows.map((row, idx) => {
                                let row_values = Object.values(row)
                                return (
                                    <tr key={idx} onClick={() => { this.rowClick(row) }}>
                                        {
                                            row_values.map((row_val, td_idx) => {
                                                return (
                                                    <td key={td_idx}>{row_val}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                            : null
                        }
                    </tbody>
                </table>
                <Pagination 
                    postsPerPage={this.props.rowPerPage}
                    totalPosts={this.props.data.length}
                    paginate={this.paginate}
                    currentPage = {this.state.currentPage}
                    />
            </div>
        )
    }
}

export default Table
