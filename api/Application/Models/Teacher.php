<?php 


class ModelsTeacher extends ModelsUser{

    public function __construct(){
        ModelsUser::__construct();
        $this->hasMany = array("course"=>"teacher_id"); 
    
    }
}