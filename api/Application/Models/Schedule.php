<?php 


use MVC\Model;

class ScheduleModel extends Model{
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array('course'=>'course');
        
    }

    public function get_all($user_id, $role){
        $res = array();
        if ($role == 'teacher'){
            $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, schedule WHERE course.`id` = schedule.`course_id` AND teacher_id = ? ORDER BY weekday_id, time_id ';
            $stmt = $this->_db->prepare($query);
            if ($stmt->execute([$user_id])){
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($res, filter($row, ['name', 'weekday_id', 'time_id']));

                }
            }
        }
        else {
            $query = 'SELECT course.name, schedule.weekday_id, schedule.time_id FROM course, user, course_student, schedule
            WHERE course.id = course_student.course_id 
            AND user.id = course_student.student_id AND schedule.course_id = course.id AND user.id = ?  ORDER BY weekday_id, time_id';
            $stmt = $this->_db->prepare($query);
            if ($stmt->execute([$user_id])){
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($res, $row);

                }
            }
        }
        return $res;
    }
} 