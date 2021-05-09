<?php
use MVC\Model;
class DocumentModel extends Model{

    // var $hasOne = array("user"=>"teacher_id");
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array('course'=>'course');
        
    }
    // var $hasManyAndBelongsToMany = array("user"=>"course_user"); 
    // var $hasMany = array("document"=>"cid", "exam"=>"cid", "schedule"=>"cid", "course_notification"=>"cid");
    


}