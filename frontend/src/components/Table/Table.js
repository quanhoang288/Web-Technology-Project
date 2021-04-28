
import './Table.css'
import React, { Component } from 'react'

export class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            query : '',
            query_field: [],

        }
    }

    componentDidMount() {

        this.setState({ data: this.props.data })
        
        //init query field 
        const columns = this.props.data[0] && Object.keys(this.props.data[0])
        const query_field = columns ? columns : []
        this.setState({query_field:query_field})
    }

    rowClick = (row_data) => {
        console.log(row_data)
    }



    queryHandler = (e) => {

        this.setState({query:e.target.value})
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

        const data = this.filterData(this.props.data)
        const columns = this.props.data[0] && Object.keys(this.props.data[0])
        return (


            <div className='custom-table'>
                

                <div  className='searchfield'>
                    <input required onChange={this.queryHandler}></input>
                    <label >Search</label>
                </div>


                <div className='hiddenCB'>
                    

                    <div className = 'checkboxes'>

                        {
                            this.props.data[0] ?
                                columns.map((elm, idx) => {
                                    return (
                                        <div>
                                            
                                                <input id={idx} key={idx} type="checkbox"  checked={this.state.query_field.includes(elm)}
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

                        {data[0] ?
                            data.map((row, idx) => {

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
               
            </div>

        )
    }
}

export default Table
