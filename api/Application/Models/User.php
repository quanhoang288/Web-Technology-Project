<?php
use MVC\Model;
class ModelsUser extends Model{
    public function find_username($username)
    {
        $stmt = $this->db->prepare('
            SELECT * from user where username = ?
        ');
        $stmt->execute(array($username));
        return $stmt->fetchAll();
    }
    public function register($data)
    {
        $stmt = $this->db->prepare('
            insert into user
            values (null,?,?,?,?,?,?,?,?)
        ');

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt->execute(array_values($data));
        
        return $stmt->fetchAll();
    }
}