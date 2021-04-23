<?php 


class ModelsStudent extends ModelsUser{
    // var $hasManyAndBelongsToMany = array("course"=>"user_course");
    public function __construct(){
        ModelsUser::__construct();
        $this->hasManyAndBelongsToMany = array("course"=>"user_course"); 
    
    }
}