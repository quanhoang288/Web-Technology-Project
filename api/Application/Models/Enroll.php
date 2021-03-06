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
        $result =  $stmt->execute([$student_id, $course_id]);
        return $result;
    }

    public function update($student_id, $course_id, $data){
        if (!isset($data['status']))
            return false; 
        $status = $data['status'];
        $query = 'UPDATE ' . $this->_table . ' SET status = ? WHERE student_id = ? AND course_id = ?';
        $stmt = $this->_db->prepare($query);
        $result =  $stmt->execute([$status, $student_id, $course_id]);
        if ($result){
            $amount_query = 'SELECT cur_amount FROM course WHERE id = ?';
            $stmt = $this->_db->prepare($amount_query);
            $stmt->execute([$course_id]);
            $amount = $stmt->fetch(PDO::FETCH_ASSOC)['cur_amount'];
            if ($status == 2){
                $amount += 1;    
                
            }
            else if ($status == 3){
                $amount -= 1;
                if ($amount < 0)
                    $amount = 0;
            }
                

            $update_query = 'UPDATE course SET cur_amount = ? WHERE id = ?';
            $stmt = $this->_db->prepare($update_query);
            return $stmt->execute([$amount, $course_id]);

        }
        else 
            return false;
    }

    public function remove($student_id, $course_id){
        $query = 'DELETE FROM ' . $this->_table . ' WHERE student_id = ? AND course_id = ?';
        $stmt = $this->_db->prepare($query);
        $result =  $stmt->execute([$student_id, $course_id]);
        if ($result){
            $amount_query = 'SELECT cur_amount FROM course WHERE id = ?';
            $stmt = $this->_db->prepare($amount_query);
            $stmt->execute([$course_id]);
            $amount = $stmt->fetch(PDO::FETCH_ASSOC)['cur_amount'];
            $amount -= 1;
            if ($amount < 0)
                $amount = 0;
            $update_query = 'UPDATE course SET cur_amount = ? WHERE id = ?';
            $stmt = $this->_db->prepare($update_query);
            return $stmt->execute([$amount, $course_id]);

        }
        else 
            return false;
    }

    public function remove_pending($course_id){
        $course_query = 'SELECT * from course where id = ?';
        $stmt = $this->_db->prepare($course_query);
        $update_query = "";
        if($stmt->execute([$course_id]))
        {
            $status = $stmt->fetch(PDO::FETCH_NAMED)['status'];
            echo($status);
            if($status == 'ongoing')
            {
                $update_query = 'UPDATE course_student SET status = 3 WHERE course_id = ? AND status IN (1)';    
            }
            else
            {
                $update_query = 'UPDATE course_student SET status = 3 WHERE course_id = ? AND status IN (1,2)';    
            }
            $stmt = $this->_db->prepare($update_query);
            return $stmt->execute([$course_id]);
        }
        return false;


    }




}