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
            $data = parent::get_all();
            
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
                $user['user']['name'] = $user['user']['firstname'] . ' ' . $user['user']['lastname'];
                array_push($res, filter($user['user'], ['username', 'password'], true));
            }

            $this->send(200, $res);
        }
        else 
            $this->send(400, ['error'=>'Bad request']);
    }

    // public function get($id, $params=null){
    //     $this->_model->id = $id;
    //     if ($params){
    //         if (isset($params['resource'])){
    //             if (!isset($params['role']) || !in_array($params['role'], ['teacher', 'student']))
    //                 $this->send(400, ['error'=>'Bad request']);
    //             else{
    //                 $role = $params['role'];
    //                 $resource = $params['resource'];
    //                 if ($resource == 'courses'){
    //                     $this->_model->showHMABTM();
    //                     $this->_model->search();
    //                 }
    //                 else if ($resource == 'schedule');
    //             }

    //         }
    //     }
    //     else 
    //         parent::get($id);
    // }
    
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

    
    
    // public function register()
    // {
    //     $data = json_decode(file_get_contents('php://input'), true);
    //     $response ='Succesfully Registerd ';
    //     try{
            
    //         $this->_model->register($data);
    //         $this->response->setContent(['message'=>$response,'code'=>201]);
    //         $this->response->sendStatus(201);
    //     }
    //     catch(PDOException $e)
    //     {
    //         $response = $e ->getMessage();
    //         $this->response->setContent(['message'=>$response,'code'=>400]);
    //         $this->response->sendStatus(200);
    //     }
    // }
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