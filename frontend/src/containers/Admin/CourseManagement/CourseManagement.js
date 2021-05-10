import React, { Component } from 'react'
import './CourseManagement.css'
import Carousel from '../../../components/Carousel/Carousel'
import Card from '../../../components/Card/Card'
import img from '../../../asset/eclass.png'
import './CourseManagement.css'
export class CourseManagement extends Component {
    state = {
        
    }
    render() {

        return (
            <React.Fragment>
                <div className='billboard'>
                    <img
                        src={img}
                    />
                    <div className='billboard-content'>
                        <h1>Dream up</h1>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <form action="#">
                            <div className="field">
                                <input type="text" required onChange={(e) => { this.fieldOnChangeHandler('username', e) }} />
                                <label>Search for courses</label>
                            </div>
                        </form>
                    </div>

                </div>
                <div className='courses-section'>

                    <div className='open-course'>
                        <h1>Up-coming course</h1>
                        <Carousel show={5}
                            children={
                                [
                                    <div>
                                        <Card id='1'></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                ]
                            }
                        >

                        </Carousel>
                    </div>
                    <div className='open-course'>
                        <h1>Course registration now open online</h1>
                        <Carousel show={5}
                            children={
                                [
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                ]
                            }
                        >

                        </Carousel>
                    </div>
                    <div className='open-course'>
                        <h1>Due</h1>
                        <Carousel show={5}
                            children={
                                [
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                    <div>
                                        <Card></Card>
                                    </div>,
                                ]
                            }
                        >

                        </Carousel>
                    </div>
                    <a href='#'>
                        <i class="fas fa-plus-circle fa-4x"></i>
                    </a>

                </div>
            </React.Fragment>

        )
    }
}

export default CourseManagement
