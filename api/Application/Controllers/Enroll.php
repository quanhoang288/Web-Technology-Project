<?php

use MVC\Controller;

class EnrollController extends Controller{
    public function __construct()
    {
        Controller::__construct();
    }

    public function get($params=null){
        
        if (isset($params['student_id'])){
            $this->_model->where('student_id', $params['student_id']);
        }
        if (isset($params['course_id'])){
            $this->_model->where('course_id', $params['course_id']);
        }
        try{
            $data = $this->_model->search();
            $this->send(200, $data);
        }
        catch(PDOException $e){
            $this->response->send(500);
        }
        
        
    }
}