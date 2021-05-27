<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class CourseController extends Controller {

    public function __construct()
    {
        Controller::__construct();
        // $this->_model = $this->_model('course');
    }
    public function get_all($params=null){
        
        if ($params && isset($params['user_id'])){
        
            $user_id = $params['user_id'];
            if (!isset($params['role']) || !in_array($params['role'], ['teacher', 'student']))
                $this->send(400, ['error'=>'Bad Request']);
            else{
                $role = $params['role'];
                $res = array();
                if ($role == 'teacher'){
                    $this->_model->where('teacher_id', $user_id);
                    $this->_model->orderBy('time_created', 'DESC');
                    $data = $this->_model->search();
                    foreach($data as $course_info){
                        $img = $course_info['course']['img'];
                        $course_info['course']['img'] = img_to_base64($img);
                        array_push($res, $course_info['course']);
                    }
                        
                }
                else {
                    $this->_model->showHMABTM();
                    $this->_model->showHasOne();
                    $this->_model->orderBy('time_created', 'DESC');
                    $data = $this->_model->search();
                    
                    foreach($data as $course_info){
                        
                        $course_info['course']['teacher_name'] = $course_info['teacher']['name'];
                        $img = $course_info['course']['img'];
                        $course_info['course']['img'] = img_to_base64($img);
                        $students = array_map(function($student){
                            return $student['id'];
                        }, $course_info['student']);
                        // var_dump($students);
                        $idx = array_search($user_id, $students);
                        
                        if (is_int($idx)){
                            // echo "found" . PHP_EOL;
                            $status = $course_info['student'][$idx]['course_student']['status'];
                            $course_info['course']['enroll_status'] = $status;
                            unset($course_info['student']);
                            array_push($res, $course_info['course']);
                            // if ($status == '2' && $course_info['course']['status'] == 'ongoing'){
                            //     unset($course_info['student']);
                            //     array_push($res, $course_info['course']);
                            // }
                        }


                        
                    }
                    
                    
                }
                $this->send(200, $res);
                
                
                
                
                    // $this->send(200, ['response'=>$result]);
                

                
            }
        }
        else if (isset($params['status'])){
            $status = $params['status'];
            
            $this->_model->where('status', $status);
            $this->_model->showHasOne();
            $this->_model->orderBy('time_created', 'DESC');
            $result = $this->_model->search();
            if ($result){
                $res = array();
                foreach($result as $course){
                    $img = $course['course']['img'];
                    $course['course']['img'] = img_to_base64($img);
                    $course['course']['teacher_name'] = $course['teacher']['name'];
                    array_push($res, filter($course['course'], ['id', 'name', 'subject', 'level', 'fee', 'teacher_name', 'img']));
                }
                $this->send(200, $res);
            }
            else 
                $this->response->sendStatus(500);
        }
        else if (isset($params['stats'])){
            $type = $params['stats'];
        
            $result = $this->_model->get_stats($type);
            if ($result){
                $this->send(200, $result);
            }
            else{
                $this->send(400, 'Error getting course stats');
            }
        }
        else{
            $this->_model->showHasOne();
            $this->_model->orderBy('time_created', 'DESC');
            $data = $this->_model->search();
            if ($data){
                $res = array();
                foreach($data as $course){
                    $img = $course['course']['img'];
                    $course['course']['img'] = img_to_base64($img);
                    $course['course']['teacher_name'] = $course['teacher']['name'];
                    array_push($res, $course['course']);
                }

                $this->send(200, $res);
                // $this->send(200, $data);
            }
            else{
                $this->response->sendStatus(500);
            }
        }
        
    }

    public function get($params=null){
        $course_id = $params['id'];
        // if (isset($params['']))
        $this->_model->id = $course_id;
        $this->_model->showHasOne();
        $this->_model->showHasMany();
        $this->_model->showHMABTM();
        $data = $this->_model->search();
        
        if (count($data)){
            $status = $data['course']['status'];
            // $res = array();
    
            // if ($status == 'new'){
            //     $data['course']['teacher_name'] = $data['teacher']['name'];
            //     // foreach($data as $course){
            //     //     $course['course']['teacher_name'] = $course['teacher']['firstname'] + $course['teacher']['lastname'];
            //     //     array_push($res, $course['course']);
            //     // }
            //     $students = array();
            //     foreach($data['student'] as $student){
            //         // $student= filter($student, ['username', 'password', 'subject', 'role', 'course_student'], true);
            //         array_push($students, ['student'=> filter($student, ['username', 'password', 'subject', 'role', 'active', 'course_student'], true), 'status' => $student['course_student']['status']]);
            //     }
            //     $data['course']['students'] = $students; 
                
    
            // }
            // else{
                // $data['course']['material'] = $data['document'];
                $students = array();
                foreach($data['student'] as $student){
                    $enroll_status = $student['course_student']['status'];
                    $student= filter($student, ['username', 'password', 'subject', 'role', 'course_student'], true);
                    $student['status'] = $enroll_status;
                    array_push($students, $student);
                }
    
                $data['student'] = $students;
                $data['course']['teacher_name'] = $data['teacher']['name'];
                // unset($data['teacher']);
                $data['course']['notifications'] = $data['course_notification'];
                $data['course']['material'] = $data['document'];
                $data['course']['exams'] = $data['exam'];
                $data['course']['students'] = $students;
                // foreach($data as $course){
                //     $course['course']['material'] = $course['document'];
                //     $course['course']['teacher_name'] = $course['teacher']['firstname'] + $course['teacher']['lastname'];
                //     $course['course']['notifications'] = $course['course_notification'];
                //     $course['course']['students'] = $course['student'];
                //     array_push($res, $course['course']);
                // }
                // $this->send(200, $data);
                
            // }
            $img = $data['course']['img'];
            $data['course']['img'] = img_to_base64($img);
            $this->send(200, $data['course']);
        }
        else{
            $this->send(404, ['error'=> 'Not found']);
        }
       
        
        
    }
    public function create()
    {
        $token = getBearerToken();
        if (JWT::verify($token, SECRET_KEY)){
            $decoded_JWT = JWT::decode(($token));
            $request_sender_role = json_decode($decoded_JWT, true)['role'];
            if ($request_sender_role == 'admin'){
                $data = json_decode(file_get_contents('php://input'), true);
                $result = $this->_model->create($data);
                if ($result) 
                    $this->send(201, 'Created');
                else 
                    $this->send(400, 'Error creating new course');
            }
            else{
                $this->send(400, "Permission Denied");
            }
        }
        else{
            $this->send(400, "Permission Denied");
        }

    }

    public function update($params){
        if (!isset($params['id']))
            $this->send(400, "Bad request");
        else{
            $course_id = $params['id'];
            $token = getBearerToken();
            if (JWT::verify($token, SECRET_KEY)){
                $decoded_JWT = JWT::decode(($token));
                $request_sender_role = json_decode($decoded_JWT, true)['role'];
                if ($request_sender_role == 'admin'){
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->_model->update($course_id, $data);
                    if ($result) 
                        $this->send(200, 'Updated');
                    else 
                        $this->send(400, 'Error updating course information');
                }
                else{
                    $this->send(400, "Permission Denied");
                }
            }
            else{
                $this->send(400, "Permission Denied");
            }
        }

        // $course_id = $params['id'];
        // $data = json_decode(file_get_contents('php://input'), true);
        // $result = $this->_model->update($course_id, $data);
        // if ($result)
        //     $this->send(200, 'Updated');
        // else 
        //     $this->send(400, 'Error');
    }
    // public function get($params=null){
    //     // if (!$params || !isset($params['user_id']))
    // }

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
















// use MVC\Controller;
// use JWT\JWT;
// require SYSTEM . 'JWT.php';
// class CourseController extends Controller {
   
//     public function __construct()
//     {
//         Controller::__construct();
        
      
     
//     }

//     public function test(){
//         // $this->_model->id = 2;
//         $this->_model->showHMABTM();
//         // $this->_model->showHasMany();
//         $this->response->setContent(['response' =>$this->_model->search()]);
//     }
//     public function get_all($params=null){
//         if (!$params)
//             parent::get_all();
//         else{
//             try{
//                 foreach($params as $key=>$value){
//                     $this->_model->where($key, $value);
                    
//                 }
//                 $data = $this->_model->search();
//                 if (count($data))
//                     $this->send(200, ['response'=>'OK', 'data'=>$data]);
//                 else 
//                     $this->send(204, ['response'=> 'No content']);
//             }
//             catch(PDOException $e){
//                 $this->send(400, ['response'=> $e->getMessage()]);
//             }

//         }
//     }
//     public function get($id){
//         parent::get($id);
//     }
    
//     public function create(){
//         $data = json_decode(file_get_contents('php://input'), true);
//         $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

//         $response ='Succesfully Registerd ';
//         try{
//             $this->_model->setAtrributes($data);
//             $this->_model->save();
//             $this->send(201, ['response'=>$response]);
//         }
//         catch(PDOException $e){
//             $this->send(400, ['response'=> $e->getMessage()]);
//         } 
//     }

    
    
//     public function register()
//     {
//         $data = json_decode(file_get_contents('php://input'), true);
//         $response ='Succesfully Registerd ';
//         try{
            
//             $this->_model->register($data);
//             $this->response->setContent(['message'=>$response,'code'=>201]);
//             $this->response->sendStatus(201);
//         }
//         catch(PDOException $e)
//         {
//             $response = $e ->getMessage();
//             $this->response->setContent(['message'=>$response,'code'=>400]);
//             $this->response->sendStatus(200);
//         }
//     }
//     public function validate()
//     {        
        
//         $data = json_decode(file_get_contents('php://input'), true);
//         $username = $data['username'];
//         $password = $data['password'];
//         $user = ($this->_model->find_username($username));

//         $response ='';
//         if(sizeof($user) == 0)
//         {
//             $response = 'invalid_username';
//             $this->response->sendStatus(401);
//             $this->response->setContent(['response'=> $response]);
//         }
//         else{
//             $user = $user[0];
            
//             if(password_verify($password, $user['password']))
//             {
//                 $token = JWT::encode($user, SECRET_KEY);
                
//                 $response = ['user'=>$user,'token' => $token];
//                 $this->response->sendStatus(200);
//                 $this->response->setContent(['response'=> $response]);    
//             }
//             else
//             {
//                 $response = 'invalid_password';
//                 $this->response->sendStatus(401);
//                 $this->response->setContent([ 'response'=> $response]);
//             }
//         }
//     }
// }