<?php 

use MVC\Model;

class EnrollModel extends Model{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        Model::__construct('course_student');


    }


}