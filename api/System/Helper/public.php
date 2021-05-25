<?php

function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}
/**
* get access token from header
* */
function getBearerToken() {
$headers = getAuthorizationHeader();
// HEADER: Get the access token from the header
if (!empty($headers)) {
    if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
        return $matches[1];
    }
}
return null;
}




function clean($data) {
    return trim(htmlspecialchars($data, ENT_COMPAT, 'UTF-8'));
}

function cleanUrl($url) {
    
    return str_replace(['%20', ' '], '-', $url);
}

function performAction($class, $method, $params=null){
    
    $class = new $class;
    return call_user_func_array(array($class, $method), $params);
    
}

function filter($arr, $fields, $reverse=false){
    $filteredArr = array();
    if ($reverse){
        foreach($arr as $key=>$value){
            if (!in_array($key, $fields)){
                $filteredArr[$key] = $value;
            }
        }
    }
    else {
        foreach($arr as $key=>$value){
            if (in_array($key, $fields))
                $filteredArr[$key] = $value;            
        }
    }

    return $filteredArr;
}

function base64_to_jpeg($base64_string, $output_file) {
    // open the output file for writing
    $ifp = fopen( $output_file, 'wb' ); 

    // split the string on commas
    $data = explode( ',', $base64_string );
    
    // echo count($data);
    // we could add validation here with ensuring count( $data ) > 1
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );

    // clean up the file resource
    fclose( $ifp ); 

    return $output_file; 
}

function img_to_base64($img_file){
   $path = UPLOAD . 'courses/' . $img_file;
   $type = pathinfo($path, PATHINFO_EXTENSION);
   $data = file_get_contents($path);
   $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
   return $base64;
}