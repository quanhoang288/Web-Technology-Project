<?php

use MVC\Controller;

class ControllersCourse extends Controller {
    private $model ;
    public function __construct()
    {
        Controller::__construct();
        $this->model = $this->model('course');
    }

    public function test_delete(){
        // $this->model->showHMABTM();
        // $this->model->showHasMany();
        $this->model->id = 1;
        $this->model->delete();
    }
    public function test_save(){
        $this->model->name = "advanced english 12";
        $this->model->fee = 500000;
        $this->model->teacher_id = 3; 
        $this->model->subject = "english";
        $this->model->min = 50;
        $this->model->max = 100;
        $this->model->level = "advanced";
        $this->model->cur_amount = 0;
        $this->model->due_registration_date = "2021-4-23";
        $this->model->status = 1;
        if ($this->model->save())
            $this->response->setContent(["response"=>"Insert successfully!"]);
        else {
            $this->response->sendStatus(401);
            $this->response->setContent(["response"=>"Error occured!"]);
        }
        

    }
    public function test_get(){
        $this->model->id = 1;
        $this->model->showHMABTM();
        $this->model->showHasMany();
        $this->response->setContent(['response' =>$this->model->search()]);
    }
    
}