<?php


$router->get('/home', 'home@index');

// If you use SPACE in the url, it should convert the space to -, /home-index
$router->get('/home index', 'home@index');

$router->post('/upload', 'home@uploadImage');

$router->post('/home', 'home@post');

$router->get('/', function() {
    echo 'Welcome ';
    
});


$router->post('/login','user@validate_user');
$router->post('/register','user@register');



$commit on master

about to rebase
