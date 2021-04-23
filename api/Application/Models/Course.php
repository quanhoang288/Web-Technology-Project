<?php
use MVC\Model;
class ModelsCourse extends Model{

    // var $hasOne = array("user"=>"teacher_id");

    var $hasManyAndBelongsToMany = array("user"=>"course_user"); 
    var $hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
    


}