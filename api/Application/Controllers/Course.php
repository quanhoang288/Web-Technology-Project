<?php

use MVC\Controller;

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
                if ($role == 'teacher'){
                    $filters = ['course', 'teacher', 'schedule'];
                    $this->_model->where('teacher_id', $user_id);
                    $this->_model->showHasOne();
                }
                else{
                    $filters = ['course', 'teacher', 'student', 'schedule'];
                    // $this->_model->childID = $user_id;
                    $this->_model->showHasOne();
                    $this->_model->showHMABTM();
                } 
             
                $this->_model->showHasMany();
                $result = $this->_model->search();
                if (!count($result)){
                    $this->send(404, ['response'=>'No course found']);
                }
                else {
                    $filteredResult = array();
                   
                    foreach($result as $course){
                        // if ($course[$role]['id'] != $user_id)
                        //     continue;
                        if ($role == 'teacher' && $course[$role]['id'] != $user_id)
                            continue; 
                        else if ($role == 'student'){
                            $found = false;
                            foreach ($course[$role] as $student){
                                if ($student['id'] == $user_id){
                                    $found = true;
                                    break;
                                }
                            }
                            if (!$found) 
                                continue;
                        }
                        $filteredCourse = filter($course, $filters);
                        if (in_array('student', $filters) && count($filteredCourse['student'])){
                            foreach($filteredCourse['student'] as $student){
                                $student = filter($student, ['username', 'password'], true);
                            }
                            // $filteredCourse['student'] = filter($filteredCourse['student'][0], ['username', 'password'], true);
                        }
                        $filteredCourse['teacher'] = filter($filteredCourse['teacher'], ['username', 'password'], true);
                        // if (count($filteredCourse['student']))
                        array_push($filteredResult, $filteredCourse);
                    }

                    $this->send(200, ['response'=> $filteredResult]);
                    // $this->send(200, ['response'=>$result]);
                }

                
            }
        }
        else if (isset($params['status'])){
            $status = $params['status'];
            
            $this->_model->where('status', $status);
            $this->_model->showHasOne();
            $result = $this->_model->search();
            if ($result){
                $res = array();
                foreach($result as $course){
                    $img = $course['course']['img'];
                    $course['course']['img'] = img_to_base64($img);
                    $course['course']['teacher_name'] = $course['teacher']['firstname'] . ' ' . $course['teacher']['lastname'];
                    array_push($res, filter($course['course'], ['id', 'name', 'subject', 'level', 'fee', 'teacher_name', 'img']));
                }
                $this->send(200, $res);
            }
            else 
                $this->response->sendStatus(500);
        }
        else{
            $this->_model->showHasOne();
            $data = $this->_model->search();
            if ($data){
                $res = array();
                foreach($data as $course){
                    $img = $course['course']['img'];
                    $course['course']['img'] = img_to_base64($img);
                    $course['course']['teacher_name'] = $course['teacher']['firstname'] . ' ' . $course['teacher']['lastname'];
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
        $data = $this->_model->search()[0];
        
        $status = $data['course']['status'];
        // $res = array();
        if ($status == 'new'){
            $data['course']['teacher_name'] = $data['teacher']['firstname'] . $data['teacher']['lastname'];
            // foreach($data as $course){
            //     $course['course']['teacher_name'] = $course['teacher']['firstname'] + $course['teacher']['lastname'];
            //     array_push($res, $course['course']);
            // }
            $this->send(200, $data['course']);
            

        }
        else{
            // $data['course']['material'] = $data['document'];
            $students = array();
            foreach($data['student'] as $student){
                // $student= filter($student, ['username', 'password', 'subject', 'role', 'course_student'], true);
                array_push($students, filter($student, ['username', 'password', 'subject', 'role', 'course_student'], true));
            }

            $data['student'] = $students;
            $data['course']['teacher_name'] = $data['teacher']['firstname'] . $data['teacher']['lastname'];
            unset($data['teacher']);
            // $data['course']['notifications'] = $data['course_notification'];
            // $data['course']['students'] = $students;
            // foreach($data as $course){
            //     $course['course']['material'] = $course['document'];
            //     $course['course']['teacher_name'] = $course['teacher']['firstname'] + $course['teacher']['lastname'];
            //     $course['course']['notifications'] = $course['course_notification'];
            //     $course['course']['students'] = $course['student'];
            //     array_push($res, $course['course']);
            // }
            $this->send(200, $data);
            
        }
        
        
    }
    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->_model->create($data);
        if ($result) 
            $this->response->sendStatus(201);
        else 
            $this->response->sendStatus(400);
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