<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class UserController extends Controller {
    private $_model ;
    public function __construct()
    {
        Controller::__construct();
        
      
     
    }

    public function test(){
        // $this->_model->id = 2;
        $this->_model->showHMABTM();
        // $this->_model->showHasMany();
        $this->response->setContent(['response' =>$this->_model->search()]);
    }
    public function get_all($params=null){
        if (!$params)
            parent::get_all();
        else{
            try{
                foreach($params as $key=>$value){
                    $this->_model->where($key, $value);
                    
                }
                $data = $this->_model->search();
                if (count($data))
                    $this->send(200, ['response'=>'OK', 'data'=>$data]);
                else 
                    $this->send(204, ['response'=> 'No content']);
            }
            catch(PDOException $e){
                $this->send(400, ['response'=> $e->getMessage()]);
            }

        }
    }
    
    public function create(){
        $data = json_decode(file_get_contents('php://input'), true);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $response ='Succesfully Registerd ';
        try{
            $this->_model->setAtrributes($data);
            $this->_model->save();
            $this->send(201, ['response'=>$response]);
        }
        catch(PDOException $e){
            $this->send(400, ['response'=> $e->getMessage()]);
        } 
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
    public function validate()
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