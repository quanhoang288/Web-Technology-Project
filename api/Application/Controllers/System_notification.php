<?php

use MVC\Controller;

class System_notificationController extends Controller {

    public function __construct()
    {
        Controller::__construct();
        // $this->_model = $this->_model('course');
    }

    public function get_all($params = null)
    {
        $data = parent::get_all();
        
        if ($data){
            $res = array();
            foreach($data as $noti){
                array_push($res, $noti['system_notification']);
            }
            $this->send(200, $res);
        }
        else 
            $this->response->setHeader(400);
    }

    
}