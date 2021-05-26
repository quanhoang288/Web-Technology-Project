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
            $this->_model->orderBy('create_at', 'DESC');
            $this->_model->where('course_id', $course_id);
            // $this->_model->showHasOne();
            try{
                $result = $this->_model->search();
                $res = array();
                foreach($result as $course_noti){
                    array_push($res, $course_noti['course_notification']);
                }
                $this->send(200, $res);
            }catch(PDOException $e){
                $this->send(400, 'Error getting course notification');
            }
            
            
            // if ($result){
            //     $res = array();
            //     foreach($result as $course_noti){
            //         array_push($res, $course_noti['course_notification']);
            //     }
            //     $this->send(200, $res);
            // }
            // else 
            //     $this->send(400, 'Error getting course notification');
            // if (!count($result)){
            //     $this->send(404, ['response'=>'No course found']);
            // }
            // else {
     
            //     $this->send(200, ['response'=> $result]);
            //     // $this->send(200, ['response'=>$result]);
            // }
                
            
        }
        else{
            $this->_model->showHasOne();
            parent::get_all($params);
        }
    }

    
}