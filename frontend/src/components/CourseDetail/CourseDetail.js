import React,{useEffect,useState} from 'react'
import {
    
    useParams, 
    
  } from "react-router-dom";
import axios from 'axios'
import {HOST_URL} from '../../config'
import './CourseDetail.css'
export default function CourseDetail() {
    let {id} = useParams()
    const [detail, setDetail] = useState({
        id:1,
        title:"title",
        description:"Course Description"
    })
    const fetchData = (id)=>{
        console.log('get course data from DB')
        //api call 
    }
    useEffect(() => {
        fetchData(id)
    },[])

    return (
        <div>
                {id}
        </div>
    )
}
