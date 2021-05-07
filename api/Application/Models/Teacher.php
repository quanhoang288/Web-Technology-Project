<?php 



class TeacherModel extends UserModel{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        UserModel::__construct();

        $this->hasMany = array("course"=>"teacher_id"); 

    }
}