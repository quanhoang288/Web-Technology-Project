<?php 


use MVC\Model;

class ScheduleModel extends Model{
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array('course'=>'course');
        
    }

    public function get_all($user_id, $role, $type){
        $res = array();
        if ($role == 'teacher'){
            if ($type == 'new' || $type == 'ongoing')
                $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, schedule WHERE course.status = "' .$type . '" AND course.`id` = schedule.`course_id` AND teacher_id = ? ORDER BY weekday_id, time_id ';
            else if ($type == 'both')
                $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, schedule WHERE course.status IN ("new","ongoing") AND course.`id` = schedule.`course_id` AND teacher_id = ? ORDER BY weekday_id, time_id ';
            else 
                return false;
                
            $stmt = $this->_db->prepare($query);
            if ($stmt->execute([$user_id])){
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($res, filter($row, ['name', 'weekday_id', 'time_id']));

                }
            }
            else 
                return false;
        }
        else {
            
            if ($type == 'new' || $type == 'ongoing')
                $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, user, course_student, schedule
                WHERE course.id = course_student.course_id 
                AND user.id = course_student.student_id AND schedule.course_id = course.id AND user.id = ? 
                AND course_student.status IN (1,2) AND course.status = "'. $type . '" ORDER BY weekday_id, time_id';
            else if ($type == 'both')
                $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, user, course_student, schedule
                WHERE course.id = course_student.course_id 
                AND user.id = course_student.student_id AND schedule.course_id = course.id AND user.id = ? 
                AND course_student.status IN (1, 2) AND course.status IN ("new","ongoing") ORDER BY weekday_id, time_id';
            else 
                return false;
            $stmt = $this->_db->prepare($query);
            if ($stmt->execute([$user_id])){
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($res, $row);
                }
            }
            else
                return false;
        }
        return $res;
    }
} 