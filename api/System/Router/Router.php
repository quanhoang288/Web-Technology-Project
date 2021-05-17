<?php

/**
 *
 * This file is part of mvc-rest-api for PHP.
 *
 */
namespace Router;


class Router {

    /**
     * route list.
     * 
     * @var array
     */
    private $router = [];

    /**
     * match route list.
     * 
     * @var array
     */
    private $matchRouter = [];

    /**
     * request url.
     * 
     * @var string
     */
    private $url;

    /**
     * request http method.
     * 
     * @var string
     */
    private $method;

    /**
     * param list for route pattern
     * 
     * @var array
     */
    private $params = [];

    /**
     *  Response Class
     */
    private $response;

    /**
     *  construct
     */
    public function __construct(string $url, string $method) {
        $this->url = rtrim($url, '/');
        $this->method = $method;

        // get response class of $GLOBALS var
        $this->response = $GLOBALS['response'];
    }

    /**
     *  set get request http method for route
     */
    public function get($pattern, $callback) {
        $this->addRoute("GET", $pattern, $callback);
    }

    /**
     *  set post request http method for route
     */
    public function post($pattern, $callback) {
        $this->addRoute('POST', $pattern, $callback);
    }

    /**
     *  set put request http method for route
     */
    public function put($pattern, $callback) {
        $this->addRoute('PUT', $pattern, $callback);
    }

    /**
     *  set delete request http method for route
     */
    public function delete($pattern, $callback) {
        $this->addRoute('DELETE', $pattern, $callback);
    }

    /**
     *  add route object into router var
     */
    public function addRoute($method, $pattern, $callback) {
        array_push($this->router, new Route($method, $pattern, $callback));
    }

    /**
     *  filter requests by http method
     */
    private function getMatchRoutersByRequestMethod() {
        foreach ($this->router as $value) {
            if (strtoupper($this->method) == $value->getMethod())
                array_push($this->matchRouter, $value);
        }
    }

    /**
     * filter route patterns by url request
     */
    private function getMatchRoutersByPattern($pattern) {
        $this->matchRouter = [];
        foreach ($pattern as $value) {
            // echo $value->getPattern() . "<br>";
            if ($this->dispatch(cleanUrl($this->url), $value->getPattern()))
                array_push($this->matchRouter, $value);
        }
    }

    /**
     *  dispatch url and pattern
     */
    public function dispatch($uri, $pattern) {
        // echo $uri . PHP_EOL;
      

        $parsUrl = explode('?', $uri);
        $url = $parsUrl[0];
        // echo $url . PHP_EOL;
        // echo $pattern . PHP_EOL;
        // echo $parsUrl[1] . "<br>";
        // var_dump($parsUrl);
        
        preg_match_all('@:([\w]+)@', $pattern, $params, PREG_PATTERN_ORDER);
        // preg_match_all('/:([\w]+)/', $pattern, $params, PREG_PATTERN_ORDER);


        // var_dump($params);
        // echo $pattern . PHP_EOL;
        
        $patternAsRegex = preg_replace_callback('@:([\w]+)@', [$this, 'convertPatternToRegex'], $pattern);
        // $patternAsRegex = preg_replace_callback(':([\w]+)', [$this, 'convertPatternToRegex'], $pattern);
        
        if (substr($pattern, -1) === '/' ) {
            // echo "123" . PHP_EOL;
	        $patternAsRegex = $patternAsRegex . '?';
	    }
        $patternAsRegex = '@^' . $patternAsRegex . '$@';
        // echo $url . PHP_EOL;
        // echo $patternAsRegex . PHP_EOL;
        // echo '-------------' . PHP_EOL;
        // check match request url
        if (preg_match($patternAsRegex, $url, $paramsValue)) {
            
            
            
            array_shift($paramsValue);
            foreach ($params[0] as $key => $value) {
                $val = substr($value, 1);
                if ($paramsValue[$val]) {
                    $this->setParams($val, urlencode($paramsValue[$val]));
                }
            }
            // var_dump($this->params);
            if (count($parsUrl) > 1){
     
                $queryString = $parsUrl[1];
                if ($queryString != ''){
                    // echo $queryString;
                    $params = explode('&amp;', $queryString);
                    foreach($params as $param){
                        $pair = explode('=', $param);
                        $paramName = $pair[0];
                        $paramValue = $pair[1];
                        $this->setParams($paramName, $paramValue);
                    }
                }
            }
            

            
            return true;
        }

        return false;
    }

    /**
     *  get router
     */
    public function getRouter() {
        return $this->router;
    }

    /**
     * set param
     */
    private function setParams($key, $value) {
        $this->params[$key] = $value;
    }

    /**
     * Convert Pattern To Regex
     */
    private function convertPatternToRegex($matches) {
        $key = str_replace(':', '', $matches[0]);
        return '(?P<' . $key . '>[a-zA-Z0-9_\-\.\!\~\*\\\'\(\)\:\@\&\=\$\+,%]+)';
    }

    /**
     *  run application
     */
    public function run() {
        // echo "1234";
        // var_dump($this->router);
        if (!is_array($this->router) || empty($this->router)) 
            throw new \Exception('NON-Object Route Set');

        $this->getMatchRoutersByRequestMethod();
        $this->getMatchRoutersByPattern($this->matchRouter);
        
        if (!$this->matchRouter || empty($this->matchRouter)) {
            echo "not found" . PHP_EOL;
			$this->sendNotFound();        
		} else {
            // echo $this->matchRouter[0]->getCallback() . PHP_EOL;
            // call to callback method
            if (is_callable($this->matchRouter[0]->getCallback()))
                call_user_func($this->matchRouter[0]->getCallback(), $this->params);
            else
                $this->runController($this->matchRouter[0]->getCallback(), $this->params);
        }
    }

    /**
     * run as controller
     */
    private function runController($controller, $params) {
        
        $parts = explode('@', $controller);
        $file = CONTROLLERS . ucfirst($parts[0]) . '.php';
        // echo $controller . PHP_EOL;
        if (file_exists($file)) {
            require_once($file);

            // controller class
            $controller = ucfirst($parts[0]) . 'Controller';
            
            if (class_exists($controller))
                $controller = new $controller();
            else
                $this->sendNotFound();
              
            
			
            // set function in controller
            if (isset($parts[1])) {
                $method = $parts[1];
				
                if (!method_exists($controller, $method))
                    $this->sendNotFound();
                
                    
				
            } else {
                $method = 'index';
            }
            
            // call to controller
            // echo $method . PHP_EOL;
            if (is_callable([$controller, $method]))
                return call_user_func([$controller, $method], $params);
            else     
                $this->sendNotFound();
            
				
        }
        else 
            $this->sendNotFound();
    }
	
	private function sendNotFound() {
		$this->response->sendStatus(404);
		$this->response->setContent(['error' => 'Sorry This Route Not Found !', 'status_code' => 404]);
	}
}
