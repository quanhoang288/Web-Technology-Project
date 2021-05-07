<?php

use MVC\Controller;

class CourseController extends Controller {
    // private $_model ;
    public function __construct()
    {
        Controller::__construct();
        // $this->_model = $this->_model('course');
    }

    public function test_delete(){
        // $this->_model->showHMABTM();
        // $this->_model->showHasMany();
        $this->_model->id = 1;
        $this->__model->delete();
    }
    public function test_save(){
        $this->_model->name = "advanced english 12";
        $this->_model->fee = 500000;
        $this->_model->teacher_id = 3; 
        $this->_model->subject = "english";
        $this->_model->min = 50;
        $this->_model->max = 100;
        $this->_model->level = "advanced";
        $this->_model->cur_amount = 0;
        $this->_model->due_registration_date = "2021-4-23";
        $this->_model->status = 1;
        if ($this->_model->save())
            $this->response->setContent(["response"=>"Insert successfully!"]);
        else {
            $this->response->sendStatus(401);
            $this->response->setContent(["response"=>"Error occured!"]);
        }
        

    }
    public function test_get(){
        $this->_model->id = 1;
        $this->_model->showHMABTM();
        $this->_model->showHasMany();
        $this->response->setContent(['response' =>$this->_model->search()]);
    }
    
}