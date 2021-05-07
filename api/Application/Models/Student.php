<?php 



class StudentModel extends UserModel{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        UserModel::__construct();

        $this->hasManyAndBelongsToMany = array("course"=>"course_user"); 

    }
}