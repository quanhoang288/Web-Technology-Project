<?php 

use MVC\Controller;
class ExamController extends Controller{
    public function __construct()
    {
        Controller::__construct();
    }

    public function get_all($params=null){
        if (isset($params['course_id'])){
            $course_id = $params['course_id'];
            $this->_model->where('course_id', $course_id);
            $this->_model->showHasOne();
            $this->_model->showHMABTM();
            $result = $this->_model->search();
            $res = array();
            if (isset($params['student_id'])){
                foreach($result as $exam_info){
                    $exam = filter($exam_info['exam'], ['course_id'], true);
                    $students = $exam_info['student'];
                    $student_id = $params['student_id'];
                    foreach($students as $student){
                        if ($student_id == $student['id']){
                            array_push($res, ['exam'=>$exam, 'score'=>$student['exam_student']['score']]);
                            break;
                        }
                    }

                }
            }
            else {
                foreach($result as $exam_info){
                    $exam = filter($exam_info['exam'], ['course_id'], true);
                    $students = $exam_info['student'];
                    $scores = array();
                    foreach ($students as $student){
                        $score = array();
                        $score['student_id'] = $student['id'];
                        $score['student_name'] = $student['name'];
                        $score['score'] = $student['exam_student']['score'];
                        array_push($scores, $score);
                    }
                    array_push($res, ['exam'=>$exam, 'scores'=>$scores]);
                }
            }

            $this->send(200, $res);
        }
        else{
            $this->_model->showHasOne();
            $this->_model->showHMABTM();
            parent::get_all($params);
        }
    }

    public function create(){
        $data = json_decode(file_get_contents("php://input"), true);
        $exam_info = $data['exam'];
        $students = $data['students'];
        $result = $this->_model->create($exam_info, $students);
        if ($result){
            $this->response->sendStatus(201);
        }
        else{
            $this->response->sendStatus(400);
        }
    }

    public function update($id){
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $this->_model->update($id, $data);
        if ($result){
            $this->response->sendStatus(200);
        }
        else{
            $this->response->sendStatus(400);
        }
    }
}