
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


            <React.Fragment>
                

                <div>
                    <input onChange={this.queryHandler}></input>
                </div>


                <div className="hiddenCB">
                    <h3>Search field</h3>

                    <div>

                        {
                            this.props.data[0] ?
                                columns.map((elm, idx) => {
                                    return (
                                        
                                            <label key={idx}>
                                                <input key={idx} type="checkbox" value="ok" checked={this.state.query_field.includes(elm)}
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
                                                {elm}
                                            </label>

                                        

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
            </React.Fragment>

        )
    }
}

export default Table
