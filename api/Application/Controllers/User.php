<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class ControllersUser extends Controller {
    private $_model ;
    public function __construct()
    {
        Controller::__construct();
        
        $this->_model = $this->model('user');
     
    }

    public function test(){
        // $this->_model->id = 2;
        $this->_model->showHMABTM();
        // $this->_model->showHasMany();
        $this->response->setContent(['response' =>$this->_model->search()]);
    }
    public function register()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $response ='Succesfully Registerd ';
        try{
            
            $this->_model->register($data);
            $this->response->setContent(['message'=>$response,'code'=>201]);
            $this->response->sendStatus(201);
        }
        catch(PDOException $e)
        {
            $response = $e ->getMessage();
            $this->response->setContent(['message'=>$response,'code'=>400]);
            $this->response->sendStatus(200);
        }
    }
    public function validate_user()
    {        
        
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $password = $data['password'];
        $user = ($this->_model->find_username($username));

        $response ='';
        if(sizeof($user) == 0)
        {
            $response = 'invalid_username';
            $this->response->sendStatus(401);
            $this->response->setContent(['response'=> $response]);
        }
        else{
            $user = $user[0];
            
            if(password_verify($password, $user['password']))
            {
                $token = JWT::encode($user, SECRET_KEY);
                
                $response = ['user'=>$user,'token' => $token];
                $this->response->sendStatus(200);
                $this->response->setContent(['response'=> $response]);    
            }
            else
            {
                $response = 'invalid_password';
                $this->response->sendStatus(401);
                $this->response->setContent([ 'response'=> $response]);
            }
        }
    }
}