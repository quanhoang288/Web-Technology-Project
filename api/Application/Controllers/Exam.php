<?php 

use MVC\Controller;
class ExamController extends Controller{
    public function __construct()
    {
        Controller::__construct();
    }

    public function get_all($params=null){
        if ($params && isset($params['course_id'])){
        
            $course_id = $params['course_id'];

            $this->_model->where('course_id', $course_id);
            $this->_model->showHasOne();
            if (isset($params['student_id'])){
                $student_id = $params['student_id'];
                $this->_model->childID = $student_id;
                
            }
            $this->_model->showHMABTM();
            $result = $this->_model->search();
            if (!count($result)){
                $this->send(404, ['response'=>'No course found']);
            }
            else {
                $filteredResult = array();
                if (isset($student_id)){
                    foreach($result as $exam){
                        foreach($exam['student'] as $student){
                            
                            if ($student['id'] == $student_id){
                                $student = filter($student, ['username', 'password'], true);
                                $exam['student'] = $student;
                                break;
                            }
                        }
                    array_push($filteredResult, $exam);
                    }
                }
                else{
                    foreach($result as $exam){
                        foreach($exam['student'] as $student){
                            $student = filter($student, ['username', 'password'], true);
                        }
                    }
                    array_push($filteredResult, $exam);
                }

                $this->send(200, ['response'=> $filteredResult]);
                // $this->send(200, ['response'=>$result]);
            }
                
            
        }
        else{
            $this->_model->showHasOne();
            $this->_model->showHMABTM();
            parent::get_all($params);
        }
    }
}