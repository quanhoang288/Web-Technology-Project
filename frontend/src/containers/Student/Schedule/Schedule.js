import React, { Component } from 'react';
import Table from '../../../components/Table/Table';
import { connect } from "react-redux";
import { HOST_URL } from "../../../config";

export class Schedule extends Component {
    state = {
        schedule: [],
    }
    
    fetch_data = () => {
        const id = this.props.user.id;
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
     
        fetch(`${HOST_URL}/schedule?user_id=${id}&role=student&type=ongoing`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
              const schedule = result.map((item) => this.int_to_time(item));
              this.setState({ schedule: schedule })
            })
          .catch((error) => console.log("error", error));

    }
    int_to_time = (schedule_item) => {
        const weekday = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];
          const shift_option = [
            {
              id: 0,
              duration: "6h-9h",
            },
            {
              id: 1,
              duration: "9h-12h",
            },
            {
              id: 2,
              duration: "12h-15h",
            },
            {
              id: 3,
              duration: "15h-18h",
            },
          ];
        
        var res = {name: schedule_item.name};
        res['weekday'] = weekday[schedule_item.weekday_id - 2];
        res['time'] = shift_option[schedule_item.time_id].duration;
        return res;

        

    }
    componentDidMount(){
        this.fetch_data();
    }
    render() {
      
        const schedule = this.state.schedule;
        // console.log(schedule);
        if (schedule.length > 0){
          return (
              <div>
                  <Table
                      rowPerPage={schedule.length}
                      data={schedule}
                    
                  ></Table>
              </div>

          )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
  });
export default connect(mapStateToProps, null)(Schedule);
  