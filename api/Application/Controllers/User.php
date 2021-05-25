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
            if (isset($params['stats'])){
                $result = $this->_model->get_stats();
                if ($result) 
                    $this->send(200, $result);
                else 
                    $this->send(400, "Error getting user stats");
            }
            else{
                try{
                    foreach($params as $key=>$value){
                        $this->_model->where($key, $value);
                        
                    }
                    $data = $this->_model->search();
                    if ($data){
                        $res = array();
                        $role = $params['role'];
                        if ($role == 'teacher'){
                            foreach($data as $user){
                                // $user['user']['name'] = $user['user']['firstname'] . ' ' . $user['user']['lastname'];
                                array_push($res, filter($user['user'], ['username', 'password', 'role', 'active'], true));
                            }
                        }
                        else{
                            foreach($data as $user){
                                // $user['user']['name'] = $user['user']['firstname'] . ' ' . $user['user']['lastname'];
                                array_push($res, filter($user['user'], ['username', 'password', 'subject', 'role', 'active'], true));
                            }
                        }
            
                        $this->send(200, $res);
                    }
                    else 
                        $this->send(400, ['error'=>'Bad request']);
                }
                catch(PDOException $e){
                    $this->send(400, ['error'=>'Bad request']);
                }
            }
            

        }

    }

    
    
    public function create(){
        $data = json_decode(file_get_contents('php://input'), true);
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT); // incoming post data
        if($data['role'] == 'admin' || $data['role'] =='teacher' )
        {
            $token  = getBearerToken();
            if(JWT::verify($token,SECRET_KEY))
            {
                $decoded_JWT = JWT::decode($token);
                $request_sender_role = json_decode($decoded_JWT, true)['role'];
                if($request_sender_role == 'admin')
                {
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
                else{
                    $this->send(400, "Permission Denied");
                }
            }
        }   
        else{
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