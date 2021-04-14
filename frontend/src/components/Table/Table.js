
import './Table.css'
import React, { Component } from 'react'

export class Table extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            data:this.props.data,
            query: '',
            query_field: []
        }
    }
    
    componentDidMount() {
        
        this.setState({ data: this.props.data })

        
    }
    
    rowClick = (row_data) => {
        console.log(row_data)
    }
    
    
    searchFieldChangeHandler = (field_index) => {
        const query_field = this.state.query_field
        
        this.setState({query_field:query_field})
    }
    
    queryHandler = (e) => {

        this.setState({ query: e.target.value })

        if (e.target.value === '') {
            this.setState({ data: this.props.data });

        }
        else {
            //perform searching
            const matchingIndex = []
            const row_data = this.props.data.map((elm, idx) => {
                return (Object.values(elm))
            })

            row_data.forEach((row, idx) => {
                row.forEach((field, idx) => {
                    let match = String(field).indexOf(this.state.query)
                    if (match > -1) {
                        matchingIndex.push(idx)
                        console.log(matchingIndex)
                    }
                }
                )
            }

            )
            this.setState({
                'data': this.props.data.filter((_, idx) => {
                    return matchingIndex.indexOf(idx) !== -1
                })
            })
        }
    }

    render() {
        const data = this.state.data
        const columns = data[0] && Object.keys(data[0])
        return (
            <React.Fragment>


                <div>
                    <input onChange={this.queryHandler} value={this.state.query}></input>
                </div>


                <div class="hiddenCB">
                    <h3>Search field</h3>

                    <div>
                     
                        {
                            data[0]?
                            columns.map((elm, idx) => {
                                return (
                                    <React.Fragment>
                                        <input key={idx} type="checkbox" checked={this.state.query_field.includes(elm)} 
                                        
                                            onClick = {(e) => {
                                                const checked = this.state.query_field.includes(elm)
                                                const query_field = {...this.state}.query_field
                                                if(checked)
                                                {
                                                    query_field.pop(elm)
                                                }
                                                else{
                                                    query_field.push(elm)
                                                }
                                                this.setState({query_field:query_field})
                                            }}
                                        /><label >{elm}</label>
                                    </React.Fragment>

                                )

                            }):null
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
