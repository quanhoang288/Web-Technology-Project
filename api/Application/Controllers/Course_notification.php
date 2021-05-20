<?php

use MVC\Controller;

class Course_notificationController extends Controller {

    public function __construct()
    {
        Controller::__construct();
        // $this->_model = $this->_model('course');
    }

    public function get_all($params = null)
    {
        if ($params && isset($params['course_id'])){
        
            $course_id = $params['course_id'];
            $this->_model->orderBy('create_at');
            $this->_model->where('course_id', $course_id);
            $this->_model->showHasOne();
            $result = $this->_model->search();

            if (!count($result)){
                $this->send(404, ['response'=>'No course found']);
            }
            else {
     
                $this->send(200, ['response'=> $result]);
                // $this->send(200, ['response'=>$result]);
            }
                
            
        }
        else{
            $this->_model->showHasOne();
            parent::get_all($params);
        }
    }

    
}