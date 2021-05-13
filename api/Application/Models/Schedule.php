<?php 


use MVC\Model;

class ScheduleModel extends Model{
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array('course'=>'course');
        
    }
} 