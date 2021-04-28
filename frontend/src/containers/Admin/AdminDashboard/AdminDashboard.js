import React, { Component } from 'react'

import Card from '../../../components/Card/Card'
import MiniCard from '../../../components/Card/MiniCard'
import './AdminDashboard.css'
export class Dashboard extends Component {
    render() {
        return (
            <div className='admin'>
                <div className='new-lists'>
                    <p>News</p>
                    <MiniCard></MiniCard>
                    <MiniCard></MiniCard>
                    <p>Add news ++++</p>
                </div>
                <div className='courses'>

                    
                    <div className='course-lists'>
                        <p>Ongoing</p>
                        <Card></Card>
                        <Card></Card>

                    </div>
                    <div className='course-lists'>
                        <p>Upcoming</p>
                        <Card></Card>
                        <Card></Card>

                    </div>
                    <div className='course-lists'>
                        <p>Closed</p>
                        <Card></Card>
                        <Card></Card>

                    </div>


                </div>



            </div>
        )
    }
}

export default Dashboard
