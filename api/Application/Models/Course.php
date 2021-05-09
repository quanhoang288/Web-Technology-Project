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

    
    // var $hasManyAndBelongsToMany = array("user"=>"course_user"); 
    // var $hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
    


}