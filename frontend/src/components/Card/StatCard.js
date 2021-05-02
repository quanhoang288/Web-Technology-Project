import React, { Component } from 'react'
import './StatCard.css'
import img from '../../asset/eclass.png'
export class StatCard extends Component {
    render() {
        return (
            <div className="wrapper-stat-card">
                <div className="stat-card">
                    <div className="card-body">
                        <div className="icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>

                        <div className="number">

                            <p>{this.props.title}</p>
                            <h1>{this.props.content}</h1>
                        </div>
                    </div>
                    <div className="card-footer">
                        <hr></hr>
                        <i class="fas fa-sync-alt"></i>
                        <span><button>Update</button></span>
                    </div>
                </div>
            </div>

        )
    }
}

export default StatCard
