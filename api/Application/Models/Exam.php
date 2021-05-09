<?php 

use MVC\Model;

class ExamModel extends Model{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        Model::__construct();

        $this->hasOne = array("course"=>"course");
        $this->hasManyAndBelongsToMany = array("student"=>"user"); 

    }
}