<?php
use MVC\Model;
class ModelsLogin extends Model{
    public function find_username($username)
    {
        $stmt = $this->db->prepare('
            SELECT * from user where username = ?
        ');
        $stmt->execute(array($username));
        return $stmt->fetchAll();
    }
}