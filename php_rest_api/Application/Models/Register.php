<?php
use MVC\Model;
class ModelsRegister extends Model{
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