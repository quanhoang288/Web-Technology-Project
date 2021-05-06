<?php

namespace Http;


class Request {

  
    public $cookie;


    public $request;

    public $files;

    public function __construct() {
        $this->request = ($_REQUEST);
        $this->cookie = $this->clean($_COOKIE);
        $this->files = $this->clean($_FILES);
    }

    public function get(String $key = '') {
        if ($key != '')
            return isset($_GET[$key]) ? $this->clean($_GET[$key]) : null;

        return  $this->clean($_GET);
    }

    /**
     *  Get $_POST parameter
     *
     * @param String $key
     * @return string
     */
    public function post(String $key = '') {
        if ($key != '')
            return isset($_POST[$key]) ? $this->clean($_POST[$key]) : null;

        return  $this->clean($_POST);
    }

    /**
     *  Get POST parameter
     *
     * @param String $key
     * @return string
     */
    public function input(String $key = '') {
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata, true);

        if ($key != '') {
            return isset($request[$key]) ? $this->clean($request[$key]) : null;
        } 

        return ($request);
    }

    /**
     *  Get value for server super global var
     *
     * @param String $key
     * @return string
     */
    public function server(String $key = '') {
        return isset($_SERVER[strtoupper($key)]) ? $this->clean($_SERVER[strtoupper($key)]) : $this->clean($_SERVER);
    }

    /**
     *  Get Method
     *
     * @return string
     */
    public function getMethod() {
        return strtoupper($this->server('REQUEST_METHOD'));
    }

    /**
     *  Returns the client IP addresses.
     *
     * @return string
     */
    public function getClientIp() {
        return $this->server('REMOTE_ADDR');
    }

    /**
     *  Script Name
     *
     * @return string
     */
    public function getUrl() {
        return str_replace('/Web-Technology-Project/api','',$this->server('REQUEST_URI'));
    }

    /**
     * Clean Data
     *
     * @param $data
     * @return string
     */
    private function clean($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {

                // Delete key
                unset($data[$key]);

                // Set new clean key
                $data[$this->clean($key)] = $this->clean($value);
            }
        } else {
            $data = htmlspecialchars($data, ENT_COMPAT, 'UTF-8');
        }

        return $data;
    }
}
