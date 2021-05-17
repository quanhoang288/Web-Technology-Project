<?php 

use MVC\Model;

class EnrollModel extends Model{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        Model::__construct('course_student');


    }


    public function create($student_id, $course_id){
        $query = 'INSERT INTO ' . $this->_table . ' (student_id, course_id) VALUES (?, ?)';
        $stmt = $this->_db->prepare($query);
        return $stmt->execute([$student_id, $course_id]);
    }

    public function update($student_id, $course_id, $data){
        if (!isset($data['status']))
            return false; 
        $status = $data['status'];
        $query = 'UPDATE ' . $this->_table . ' SET status = ? WHERE student_id = ? AND course_id = ?';
        $stmt = $this->_db->prepare($query);
        return $stmt->execute([$status, $student_id, $course_id]);
    }

    public function remove($student_id, $course_id){
        $query = 'DELETE FROM ' . $this->_table . ' WHERE student_id = ? AND course_id = ?';
        $stmt = $this->_db->prepare($query);
        return $stmt->execute([$student_id, $course_id]);
    }


}