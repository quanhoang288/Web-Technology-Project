
import './StudentCourseDetail.css'
import React , {useState, useEffect}from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {HOST_URL} from '../../../config'
export default function StudentCourseDetail() {
    const {id} = useParams()
    const [courseInfo, setCourseInfo] = useState({
        id:1,
        title:"My Course",
        description:"Description",
        price:'',
        teacher:"",
        enrolled:true
    })
    useEffect(() => {
        //componentDidMount

      },[]);
    return (
        <div>
            {courseInfo.enrolled ? 
            <div>Enrolled</div>
                :    
                <div>Detail</div>
        }
        </div>
    )
}



