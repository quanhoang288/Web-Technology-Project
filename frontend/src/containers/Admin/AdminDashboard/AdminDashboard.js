import React, { Component } from 'react'
import './AdminDashboard.css'
import Notiboard from '../../../components/Notiboard/Notiboard'
import StatCard from '../../../components/Card/StatCard'
import MOCKDATA from '../../../components/Notiboard/mock.json'

export class Dashboard extends Component {
    render() {
        const stats = [
            {title:"Revenue",content:"$1234"},
            {title:"Visitor",content:"123"},
            {title:"Student",content:"69"},
            {title:"Course",content:"96"},
        ]
            
        return (
            <div className='dashboard'>
                <div className="title">
                    Dashboard
                </div>
                <div className="statistics">
                   {
                       stats.map((item, idx) => {
                           return(
                               <StatCard
                                    title = {item.title}
                                    content = {item.content}
                               />
                           )
                       })
                   }
                </div>
                
                <div className="notiboard">
                <Notiboard data = {MOCKDATA} rowPerPage={2}>
                    </Notiboard>
                    <div className="create-plan">
          <h1>Update plan</h1>
          <hr></hr>
          <textarea></textarea>
          <button>Submit</button>
        </div>
                </div>
                    

                    
                    
                
                
            </div>
        )
    }
}
export default Dashboard
