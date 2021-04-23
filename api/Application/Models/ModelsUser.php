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


    public function __construct(){
        // echo "User class: " . get_class() . PHP_EOL;
        Model::__construct(get_class());
        // echo "Model user table : " . $this->_table . PHP_EOL;
        // $this->hasManyAndBelongsToMany = array("course"=>"course_user"); 
        // $this->hasMany = array("course"=>"teacher_id");
    }

    
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