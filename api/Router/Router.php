<?php



#routers for user
$router->get('/users', 'user@get_all');
$router->get('/users/:id','user@get');
$router->post('/users', 'user@create');
$router->put('/users/:id', 'user@update');
$router->delete('/users/:id', 'user@delete');

#routers for course 
$router->get('/courses', 'course@get_all');
$router->get('/courses/:id', 'course@get');
$router->post('/courses', 'course@create');
$router->put('/courses/:id', 'course@update');
$router->delete('/courses/:id', 'course@delete');


#routers for system notification
$router->get('/system_notifications', 'system_notification@get_all');
$router->get('/system_notifications/:id', 'system_notification@get');
$router->post('/system_notifications', 'system_notification@create');
$router->put('/system_notifications/:id', 'system_notification@update');
$router->delete('/system_notifications/:id', 'system_notification@delete');

#routers for course's document
$router->get('/documents', 'document@get_all');
$router->get('/documents/:id', 'document@get');
$router->post('/documents', 'document@create');
$router->put('/documents', 'document@update');
$router->delete('/documents', 'document@delete');

#router for course's notification 
$router->get('/course_notifications', 'course_notification@get_all');
$router->get('/course_notifications/:id', 'course_notification@get');
$router->post('/course_notifications', 'course_notification@create');
$router->put('/course_notifications/:id', 'course_notification@update');
$router->delete('/course_notifications/:id', 'course_notification@delete');

#router for course's test results
$router->get('/results?course_id=?exam_id=?student_id=?', 'result@get');
$router->post('/results', 'result@create');
$router->put('/results/:id', 'result@update');
$router->delete('/results/:id', 'result@delete');

#router for student's payment
$router->get('/payments', 'payment@get_all');
$router->get('/payments/:id', 'payment@get');
$router->post('/payments', 'payment@create');
$router->put('/payments/:id', 'payment@update');
$router->delete('/payments/:id', 'payment@delete');


#router for schedule 
$router->get('/schedule', 'schedule@get_all');
$router->get('/schedule/:id', 'schedule@get');
$router->post('/schedule', 'schedule@create');
$router->put('/schedule/:id', 'schedule@update');
$router->delete('/schedule/:id', 'schedule@delete');

$router->post('/login','user@validate_user');
$router->post('/register','user@register');


