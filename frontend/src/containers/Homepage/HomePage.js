import React, { Component } from "react";
import img from "../../asset/eclass.png";
import Notiboard from "../../components/Notiboard/Notiboard";
import MOCKDATA from "../../components/Notiboard/mock.json";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
export class HomePage extends Component {
    state = {
        
    }
    render() {
    return (
      <div className="homepage">
        <div className="billboard">
          <img src={img} />
          <div className="billboard-content">
            <h1>Dream up</h1>
            <p>
              Ambition accepted. Learn the latest skills to reach your
              professional goals.
            </p>
            <form action="#">
              <div className="field">
                <input type="text" required />
                <label>Search for courses</label>
              </div>
            </form>
          </div>
        </div>

        <Notiboard data={MOCKDATA} rowPerPage={3}></Notiboard>
        <div className="featuring-courses">
          <div className="open-course">
            <h1>Best seller</h1>
            <Carousel
              show={5}
              children={[
                <div>
                  <Card id={1}></Card>
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
              ]}
            ></Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
