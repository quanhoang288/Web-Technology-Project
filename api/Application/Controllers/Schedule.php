<?php

use MVC\Controller;

class ScheduleController extends Controller{
    public function __construct()
    {
        Controller::__construct();
    }

    public function get_all($params = null)
    {
        
        if ($params){
            if (isset($params['time_id']) && isset($params['weekday_id'])){
                $time_id = $params['time_id'];
                $weekday_id = $params['weekday_id'];
                $this->_model->where('weekday_id', $weekday_id);
                $this->_model->where('time_id', $time_id);
                $result = $this->_model->search();
                $this->send(200, $result);
            }
            else if (isset($params['course_id'])){
                $course_id = $params['course_id'];
                $this->_model->where('course_id', $course_id);
                $this->_model->showHasOne();
                $result = $this->_model->search();

                $result = array_map(function($schedule_item){
                    $res = array();
                    $course_name = $schedule_item['course']['name'];
                    $res['name'] = $course_name;
                    $res['weekday_id'] = $schedule_item['schedule']['weekday_id'];
                    $res['time_id'] = $schedule_item['schedule']['time_id'];

                    return $res;
                }, $result);
                $this->send(200, $result);
               
            }
            else if (isset($params['user_id']) && isset($params['role']) && isset($params['type'])){ 
       
                $result = $this->_model->get_all($params['user_id'], $params['role'], $params['type']);
                if (is_array($result))
                    $this->send(200, $result);
                else
                    $this->send(400, "Error getting schedule");
            }
            else
                $this->send(400, "Bad request");

        }
        else
            parent::get_all();
    }
}