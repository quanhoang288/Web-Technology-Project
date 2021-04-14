<?php    
 
define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));

$url = $_SERVER['REQUEST_URI'];
$url = str_replace('/todo/','',$url);

require_once (ROOT . DS . 'library' . DS . 'bootstrap.php');
