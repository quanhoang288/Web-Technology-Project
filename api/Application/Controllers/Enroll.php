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
            $res = array();
            if (!isset($params['student_id'])){
                foreach($data as $enroll){
                    // $student_id = $enroll['course_student']['student_id'];
                    array_push($res, filter($enroll['course_student'], ['course_id'], true));
                }
            }
            else if (!isset($params['course_id'])){
                foreach($data as $enroll){
                    // $student_id = $enroll['course_student']['student_id'];
                    array_push($res, filter($enroll['course_student'], ['student_id'], true));
                }
            }
            else {
                foreach($data as $enroll){
                    // $student_id = $enroll['course_student']['student_id'];
                    array_push($res, $enroll['course_student']);
                }
            }

                
            $this->send(200, $res);
        }
        catch(PDOException $e){
            $this->response->send(500);
        }
        
    }

    public function create(){
        $data = json_decode(file_get_contents('php://input'), true);
        $student_id = $data['student_id'];
        $course_id = $data['course_id'];
        $result = $this->_model->create($student_id, $course_id);
        if ($result){
            $this->response->sendStatus(201);
        }
        else 
            $this->response->sendStatus(400);
    }

    public function update($params){
        if (!$params){
            $this->send(400, ['error' => 'Bad Request']);
        }
        else {
            $student_id = $params['student_id'];
            $course_id = $params['course_id'];
            $data = json_decode(file_get_contents('php://input'), true);
            $result = $this->_model->update($student_id, $course_id, $data);
            if ($result){
                $this->response->sendStatus(200);
            }
            else 
                $this->response->sendStatus(400);
        }


    }

    public function delete($params){
        if (!$params){
            $this->send(400, "Bad request");
        }
        else if (isset($params['course_id'])){
            $course_id = $params['course_id'];
            $result = $this->_model->remove_pending($course_id);
        }
        else {
            $student_id = $params['student_id'];
            $course_id = $params['course_id'];
            $result = $this->_model->remove($student_id, $course_id);

        }
        if ($result){
            $this->send(200, "Deleted");
        }
        else 
            $this->send(400, "Error deleting enroll");

    }

    
}