<?php	

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));

$url = str_replace('/Web-Technology-Project/Lab_4/framework/','', $_SERVER['REQUEST_URI']);

require_once (ROOT . DS . 'library' . DS . 'bootstrap.php');