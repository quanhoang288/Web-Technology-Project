<?php
use MVC\Model;
class ModelsUser extends Model{
    protected $username;
    protected $password;
    protected $firstname;
    protected $phone;
    protected $school;
    protected $active;
    protected $role;



    var $hasManyAndBelongsToMany = array("course"=>"course_user"); 
    var $hasMany = array("course"=>"teacher_id");
    
    public function find_username($username){
        $stmt = $this->db->prepare('
            SELECT * from user where username = ?
        ');
        $stmt->execute(array($username));
        
        return $stmt->fetchAll(PDO::FETCH_NAMED);
    }

    public function register($data)
    {
        
        $stmt = $this->db->prepare('
            insert into user
            values (null,?,?,?,?,?,?,1,?)
        ');

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt->execute(array_values($data));
        
        return $stmt->fetchAll(PDO::FETCH_NAMED);
    }
    

}