<?php 

use MVC\Model;

class ExamModel extends Model{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        Model::__construct();

        $this->hasOne = array("course"=>"course");
        $this->hasManyAndBelongsToMany = array("student"=>"user"); 

    }

    public function create($exam_info, $students){
        foreach($exam_info as $key => $value){
            if (!in_array($key, $this->_describe))
                return false;
        }
        $this->setAtrributes($exam_info);
        if (!$this->save())
            return false;
        $exam_id = $this->_db->getLastId();
        foreach($students as $student){
            $student_id = $student['id'];
            $insert_query = 'INSERT INTO exam_student (exam_id, student_id) VALUES (?, ?)';
            $stmt = $this->_db->prepare($insert_query);
            if (!$stmt->execute([$exam_id, $student_id]))
                return false;
        }
        return true;

    }

    public function update($exam_id, $data){
        foreach($data as $update_info){
            $student_id = $update_info['student_id'];
            $score = $update_info['score'];
            $update_query = 'UPDATE exam_student SET score = ? WHERE exam_id = ? AND student_id = ?';
            $stmt = $this->_db->prepare($update_query);
            if (!$stmt->execute([$score, $exam_id, $student_id]))
                return false;
        }
        return true;
    }
}