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
                
            }
            else if (isset($params['course_id'])){
                $course_id = $params['course_id'];
                $this->_model->where('course_id', $course_id);
    
            }
            $result = $this->_model->search();
            if (count($result)){
                $this->response->sendStatus(200);
                $this->response->setContent($result); 
            }         
            else 
                $this->response->sendStatus(404);
        }
        else
            parent::get_all();
    }
}