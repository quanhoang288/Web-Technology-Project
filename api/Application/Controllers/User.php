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
                    $this->_model->orderBy('name');
                    $data = $this->_model->search();
                    if (is_array($data)){
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
                                array_push($res, filter($user['user'], ['username', 'password', 'subject', 'role', 'active', 'status'], true));
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
        
        if($data['role'] == 'admin' || $data['role'] =='teacher')
        {
            $token  = getBearerToken();
            if(JWT::verify($token,SECRET_KEY))
            {
                $decoded_JWT = JWT::decode($token);
                $request_sender_role = json_decode($decoded_JWT, true)['role'];
                if($request_sender_role == 'admin')
                {
                    $response ='Succesfully Registerd';
                    try{
                        
                        $this->_model->setAtrributes($data);
                        if ($this->_model->save())
                            $this->send(201, $response);
                        else{
                            $this->send(400, 'Error creating user');
                        }
                        
                    }
                    catch(PDOException $e){
                        
                        $this->send(400,"Error creating user");
                    }             
                }
                else{
                    $this->send(400, "Permission Denied");
                }
            }
            else{
                $this->send(400, "Permission Denied");
            }
        }   
        else{
            $response ='Succesfully Registerd ';
            try{
                $this->_model->setAtrributes($data);
                $this->_model->save();
                $this->send(201, $response);
            }
            catch(PDOException $e){
                $this->send(400, $e->getMessage());
            } 
        }
        
    }

    
    public function update($params)
    {
        if (!$params){
            $this->send(400, 'Bad request');
        }
        else{
            $id = $params['id'];
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['old_password'])){
                $old_password = $data['old_password'];
                $new_password = $data['new_password'];
                $this->_model->id = $id;
                $result = $this->_model->search();
                if (is_array($result) && count($result)){
                    $user_password = $result['user']['password'];
                    if(password_verify($old_password, $user_password))
                    {
                        $this->_model->id = $id;
                        $this->_model->setAtrributes(["password"=> password_hash($new_password,PASSWORD_DEFAULT)]);
                        $result = $this->_model->save();
                        if ($result)    
                            $this->send(200, 'Updated password');
                        else 
                            $this->send(400, "Error updating password");
                        
                    }
                    else
                        $this->send(401, "Invalid password");
                }
                else{
                    $this->send(400, "User not found");
                }
            }
            else{
                $token  = getBearerToken();
                if(JWT::verify($token,SECRET_KEY)){
                    $response ='Succesfully Updated User Information';
                    try{
                        $this->_model->id = $id;
                        foreach($data as $key=>$value){
                            if (!$this->_model->in_describe($key)){
                                $this->send(400,"Bad request");
                                exit();
                            }
                        }
                        $this->_model->setAtrributes($data);
                        if ($this->_model->save())
                            $this->send(201, $response);
                        else
                            $this->send(400, 'Error updating user information');
                    }
                    catch(PDOException $e){
                        
                        $this->send(400,"Error updating user information");
                    }             
                }
                else{
                    $this->send(400, "Permission Denied");
                }
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
            $this->send(400,$response);
            
        }
        else{
            $user = $user[0];
            
            if(password_verify($password, $user['password']))
            {
                $token = JWT::encode($user, SECRET_KEY);
                
                $response = ['user'=>$user,'token' => $token];
                $this->send(200,$response);
                
            }
            else
            {
                $response = 'invalid_password';
                $this->send(400,$response);
            }
        }
    }
}