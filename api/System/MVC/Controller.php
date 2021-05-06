<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */
namespace MVC;
use \Exception as Exception;
/**
 * Class Controller, a port of MVC
 *
 * @author Mohammad Rahmani <rto1680@gmail.com>
 *
 * @package MVC
 */
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
        $model = str_replace('Controller', '', get_class($this));
        $this->_model = $this->model($model);
        

        $this->request = $GLOBALS['request'];
        $this->response = $GLOBALS['response'];
    }
    protected function get_all(){
        $this->_model->search();
    }

    protected function get(){
        
    }

    protected function create(){

    }

    protected function delete(){

    }

    /**
     * get Model
     * 
     * @param string $model
     * 
     * @return object
     */
    public function model($model) {
        $file = MODELS . ucfirst($model) . '.php';

		// check exists file
        if (file_exists($file)) {
            require_once $file;

            // $model = 'Models' . str_replace('/', '', ucwords($model, '/'));
			$model = ucfirst($model) . 'Model';
            // check class exists
            if (class_exists($model))
                return new $model;
            else 
                throw new Exception(sprintf('{ %s } this model class not found', $model));
        } else {
            throw new Exception(sprintf('{ %s } this model file not found', $file));
        }
    }

	// send response faster
    public function send($status = 200, $msg) {
        $this->response->setHeader(sprintf('HTTP/1.1 ' . $status . ' %s' , $this->response->getStatusCodeText($status)));
        $this->response->setContent($msg);
    }
}
