<?php

use MVC\Controller;

class DocumentController extends Controller
{

    public function __construct()
    {
        Controller::__construct();
        // $this->_model = $this->_model('course');
    }

    public function get_all($params = null)
    {

        if (isset($params['course_id'])) {

            $course_id = $params['course_id'];

            $this->_model->where('course_id', $course_id);
            $this->_model->orderBy('time_created', 'DESC');
            // $this->_model->showHasOne();
            $result = $this->_model->search();
            $res = array();
            foreach($result as $doc){
                // $filename = $doc['document']['filename'];
                // $doc['document']['filename'] = explode('-', $filename)[1];
                array_push($res, filter($doc['document'], ['course_id'], true));
            }
            $this->send(200, $res);
        } else {
            $this->_model->showHasOne();
            parent::get_all($params);
        }
    }

    public function get($params){
        $this->_model->id = $params['id'];
        $result = $this->_model->search();

        if (count($result)){
            $filename = $result['document']['filename'];
            $filepath = UPLOAD . 'material/' . $filename; 
            // echo $filename . PHP_EOL;
            // echo $filepath . PHP_EOL;
            // if (!empty($filename))
            //     echo "empty" . PHP_EOL;
            // if (!file_exists($filepath))
            //     echo "exist" . PHP_EOL;
            if(!empty($filename) && file_exists($filepath)){
                header("Cache-Control: public");
                header("Content-Description: FIle Transfer");
                header("Content-Disposition: attachment; filename=$filename");
                header("Content-Type: application/zip");
                header("Content-Transfer-Emcoding: binary");
                if (readfile($filepath)){
                    exit();
                }
                else {
                    $this->send(500, 'Internal Server Error 1');
                }
            }
            else{
                $this->send(500, 'Internal Server Error 2');
            }
        }
        else {
            $this->send(404, 'File not found');
        }
        // if(!empty($_GET['file']))
        // {
        //     $filename = basename($_GET['file']);
        //     $filepath = 'uploads/' . $filename;
        //     if(!empty($filename) && file_exists($filepath)){
        // //Define Headers
        //         header("Cache-Control: public");
        //         header("Content-Description: FIle Transfer");
        //         header("Content-Disposition: attachment; filename=$filename");
        //         header("Content-Type: application/zip");
        //         header("Content-Transfer-Emcoding: binary");
        //         readfile($filepath);
        //         exit;
        //     }
        //     else{
        //         echo "This File Does not exist.";
        //     }
        // }
    }

    public function create()
    {
        if ($_FILES['material']) {
            
            $filename = $_FILES["material"]["name"];
            $tmp_name = $_FILES["material"]["tmp_name"];
            $error = $_FILES["material"]["error"];
            $course_id = $_POST["course_id"];
            $time_created = $_POST["time_created"];
            if ($error > 0) {
                
                $this->send(400, ["error" => "Error uploading file"]);
            } else {
                $filename = preg_replace('/\s+/', '-', $filename);
                $random_name = rand(1000, 1000000) . "-" . $filename;                
                $upload_name = UPLOAD .  'material/' . strtolower($random_name);
                
                if (move_uploaded_file($tmp_name, $upload_name)) {
                    $insert_data = ['course_id' => $course_id, 'time_created' => $time_created, 'filename' => $random_name];
                    // echo $random_name . PHP_EOL;
                    // echo $upload_name . PHP_EOL;
                    // echo $course_id . PHP_EOL;
                    // echo $time_created . PHP_EOL;
                    $this->_model->setAtrributes($insert_data);
                    $result = $this->_model->save();
                    if ($result)
                    $this->send(201, ["Created"]);
                    else 
                        $this->send(400, ["error" => "Error uploading file"]);
                } else {
                    $this->send(400, ["error" => "Error uploading file"]);
                }
            }
        } else {
            $this->send(400, ["error" => "No file upload"]);
        }
        
    }
}
