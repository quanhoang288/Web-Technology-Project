<?php

// autoload class
function autoload($class) {
    // set file class
    // echo "Inside Startup.php - Class: $class" . PHP_EOL;
    $systemFile = SYSTEM . str_replace('\\', '/', $class) . '.php';
    $modelFile = MODELS.str_replace('\\', '/', $class) . '.php';
    $controllerFile = CONTROLLERS.str_replace('\\', '/', $class) . '.php';
    
    if (file_exists($systemFile)){
        // echo "system file exist!" . PHP_EOL;
        require_once $systemFile;
    }
        
    else if (file_exists($controllerFile)){
        // echo "controller file exist" . PHP_EOL;
        require_once $controllerFile;
    }

    else if (file_exists($modelFile)){
        // echo "model file exist" . PHP_EOL;
        require_once $modelFile;
    }
        
    else
        throw new Exception(sprintf('Class { %s } Not Found!', $class));
}

// set autoload function
spl_autoload_register('autoload');

// load helper
require_once SYSTEM . 'Helper/public.php';
