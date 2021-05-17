<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class UserController extends Controller {
   
    public function __construct()
    {
        Controller::__construct();
    }


    public function get_all($params=null){
        if (!$params){
            parent::get_all();
            
        }
            
        else{
            try{
                foreach($params as $key=>$value){
                    $this->_model->where($key, $value);
                    
                }
                $data = $this->_model->search();
            }
            catch(PDOException $e){
                $this->send(400, ['error'=>'Bad request']);
            }

        }
        if ($data){
            $res = array();

            foreach($data as $user){
                // $user['user']['name'] = $user['user']['firstname'] . ' ' . $user['user']['lastname'];
                array_push($res, filter($user['user'], ['username', 'password'], true));
            }

            $this->send(200, $res);
        }
        else 
            $this->send(400, ['error'=>'Bad request']);
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