<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */
namespace MVC;
use \Exception as Exception;
use PDOException;


class Controller {

    /**
     * Request Class.
     */
    public $request;

    /**
     * Response Class.
     */
    public $response;
    protected $_model;
	/**
	*  Construct
	*/
    public function __construct() {
        $this->request = $GLOBALS['request'];
        $this->response = $GLOBALS['response'];
        $model = str_replace('Controller', '', get_class($this));
                
        $this->_model = $this->model($model);
    }
    public function get_all($params=null){
        try{
            if ($params){
                foreach($params as $key=>$value){
                    $this->_model->where($key, $value);
                }
            }
            $data = $this->_model->search();
            // return $data;
            $this->send(200, $data);
            // if (count($data))
            //     $this->send(200, $data);
            // else 
            //     $this->send(404, ['response'=> 'No resource found']);
        }
        catch(PDOException $e){
            // return false;
            $this->send(400, ['response'=> $e->getMessage()]);
        } 
    }

    public function get($params){
        

        $id = $params['id'];
        try{
            if (count($params) > 1){
                foreach($params as $key=>$value){
                    $this->_model->where($key, $value);
                }
            }
            $this->_model->id = $id;
            $data = $this->_model->search();
            $this->send(200, $data);
        }
        catch(PDOException $e){
            $this->send(400, ['response'=> $e->getMessage()]);
        } 
        

        
    }

    public function create(){
        
        $data = json_decode(file_get_contents('php://input'), true);
        try{
            $this->_model->setAtrributes($data);
            $this->_model->save();
            $this->send(201, ['response'=>'OK']);
        }
        catch(PDOException $e){
            $this->send(400, ['response'=> $e->getMessage()]);
        } 

    }
    public function update($params){
        if (!$params){
            $this->send(400, ['error' => 'Bad Request']);
        }
        else {
            $id = $params['id'];
            $data = json_decode(file_get_contents('php://input'), true);
            try{
                $this->_model->setAtrributes($data);
                $this->_model->id = $id;
                $this->_model->save();
                $this->send(200, ['response'=>'OK']);
            }
            catch(PDOException $e){
                $this->send(400, ['response'=> $e->getMessage()]);
            } 
        }


    }

    public function delete($params){
        if (!$params){
            $this->send(400, ['error' => 'Bad Request']);
        }
        else {
            $id = $params['id'];
            try{  
                $this->_model->id = $id;
                $this->_model->delete();
                $this->send(200, ['response'=>'OK']);
            }
            catch(PDOException $e){
                $this->send(400, ['response'=> $e->getMessage()]);
            } 
        }

    }

    /**
     * get Model
     * 
     * @param string $model
     * 
     * @return object
     */
    private function model($model) {
        // echo $model . PHP_EOL;
        $file = MODELS . ucfirst($model) . '.php';

		// check exists file
        if (file_exists($file)) {
            require_once $file;
            
       
            $model = ucfirst($model) . 'Model';
            
			// check class exists
            if (class_exists($model)){
                // echo "Inside controller - Model: $model" . PHP_EOL;
                return new $model;
            }
                
            else{
         
                throw new Exception(sprintf('{ %s } this model class not found', $model));
            }
                
        } else {
            // echo "error";
            throw new Exception(sprintf('{ %s } this model file not found', $file));
        }
    }

	// send response faster
    public function send($status = 200, $msg) {
        $this->response->setHeader(sprintf('HTTP/1.1 ' . $status . ' %s' , $this->response->getStatusCodeText($status)));
        $this->response->setContent($msg);
    }
}
