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

	/**
	*  Construct
	*/
    public function __construct() {
        $this->request = $GLOBALS['request'];
        $this->response = $GLOBALS['response'];
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
        // echo "Inside controller: ".$file . PHP_EOL;
		// check exists file
        if (file_exists($file)) {
            require_once $file;
            
            $model = 'Models' . str_replace('/', '', ucwords($model, '/'));
        
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
