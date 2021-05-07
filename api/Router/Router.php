<?php

#todo 
# get all users with a specific role => /users?role=:rolename
# get user personal info => /users/:id 
# get user schedule =>  /courses?uid=:uid
# get user courses => /courses?uid=:uid

# get system notification => /system_notifications
# view system notifcation detail => /system_notifications/:id

# get student list of a course => /courses/:id 
# get all test results of a course => /exams?cid=:cid
# get all document of a course => /documents?cid=:cid
# get all posts of a course => /notifcations?cid=:cid

# create a new user => /users
# create a new course => /courses
# create a new system notification => /system_notifications
# create a course post => /posts
# create a new course document => /documents
# create a new course test result => /results
# create a new student enrollment + payment =>

#update user info /users/:id
#update course info /courses/:id
#update course test result /results/:id
#update system notifcation /system_notifications/:id
#update course notification /notifications/:id
#update student enrollment 


#delete course document 
#delete student enrollment




#routers for user
#used for retrieval of student and teacher lists, student lists of a course 
$router->get('/users', 'user@get_all');
$router->get('/users/:id','user@get');
$router->post('/users/login', 'user@validate');
$router->post('/users', 'user@create');
$router->put('/users/:id', 'user@update');
$router->delete('/users/:id', 'user@delete');

$router->post('/upload', 'home@uploadImage');

$router->post('/home', 'home@post');



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


