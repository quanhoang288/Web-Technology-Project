<?php

use MVC\Controller;
class ControllersRegister extends Controller {
    public function register()
    {
        $model = $this->model('register');
        $model->register($_POST);
    }

}
