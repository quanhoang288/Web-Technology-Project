<?php
use MVC\Model;
class CourseModel extends Model{

    // var $hasOne = array("user"=>"teacher_id");
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array("teacher"=>"user");
        $this->hasManyAndBelongsToMany = array("student"=>"user"); 
        $this->hasMany = array("document"=>"document", "exam"=>"exam", "schedule"=>"schedule", "course_notification"=>"course_notification");
 
        
    }

    public function create($data){
        $course_data = $data['course'];
        $schedule_data = $data['schedule'];
        $this->setAtrributes($course_data);
        $result = $this->save();
        if (!$result)
            return false;

        $course_id = $this->_db->getLastId();
        $child_query = 'INSERT INTO schedule (course_id, weekday_id, time_id) VALUES (?, ?, ?)';
        foreach($schedule_data as $schedule){
            $weekday_id = $schedule['weekday_id'];
            $time_id  = $schedule['time_id'];
            $stmt = $this->_db->prepare($child_query);
            $result = $stmt->execute([$course_id, $weekday_id, $time_id]);
            if (!$result)
                return false;
        }
        return true;

    }
    
    // var $hasManyAndBelongsToMany = array("user"=>"course_user"); 
    // var $hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
    


}