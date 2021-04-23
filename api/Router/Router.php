<?php


$router->get('/home', 'home@index');

// If you use SPACE in the url, it should convert the space to -, /home-index
$router->get('/home index', 'home@index');

$router->post('/upload', 'home@uploadImage');

$router->post('/home', 'home@post');

$router->get('/', function() {
    echo 'Welcome ';
    
});
$router->get('/course/delete', 'course@test_delete');
$router->get('/course/insert', 'course@test_save');
$router->get('/course', 'course@test_get');
$router->get('/user', 'user@test');
$router->post('/login','user@validate_user');
$router->post('/register','user@register');


