<?php
use MVC\Model;
class UserModel extends Model{
    public function __construct()
    {
        Model::__construct();
        
    }
    public function find_username($username)
    {
        $stmt = $this->_db->prepare('
            SELECT * from user where username = ?
        ');
        $stmt->execute(array($username));
        
        return $stmt->fetchAll(PDO::FETCH_NAMED);
    }

    public function register($data)
    {
        
        $stmt = $this->_db->prepare('
            insert into user
            values (null,?,?,?,?,?,?,1,?)
        ');

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt->execute(array_values($data));
        
        return $stmt->fetchAll(PDO::FETCH_NAMED);
    }
    

}