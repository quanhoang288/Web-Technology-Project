<?php 



class ModelsTeacher extends ModelsUser{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    
    public function __construct(){
        
        ModelsUser::__construct();

        $this->hasMany = array("course"=>"teacher_id"); 

    }
}