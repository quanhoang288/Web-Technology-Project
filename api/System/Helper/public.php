<?php
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