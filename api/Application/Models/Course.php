<?php
use MVC\Model;
class ModelsCourse extends Model{

    // var $hasOne = array("user"=>"teacher_id");
    public function __construct()
    {
        Model::__construct();
        $this->hasManyAndBelongsToMany = array("user"=>"course_user"); 
        $this->hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
        
    }
    // var $hasManyAndBelongsToMany = array("user"=>"course_user"); 
    // var $hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
    


}