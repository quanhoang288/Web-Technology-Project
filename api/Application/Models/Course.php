<?php
use MVC\Model;
class CourseModel extends Model{

    // var $hasOne = array("user"=>"teacher_id");
    public function __construct()
    {
        Model::__construct();
        $this->hasOne = array("teacher"=>"user");
        $this->hasManyAndBelongsToMany = array("student"=>"user"); 
        $this->hasMany = array("document"=>"document", "exam"=>"exam", "schedule"=>"schedule", "course_notification"=>"course_notification");
    }

    public function get_stats($type){
        $now = date(('Y-m-d H:i:s'));
        $res = array();
        if ($type == 'day')
            $diff = 1;
        else if ($type == 'week'){
            $diff = 7;
        }
        else if ($type == 'month')
            $diff = 30;
        else if ($type == 'year')
            $diff = '365';
        
        if (isset($diff)){
            $revenue_query = 'SELECT SUM(cur_amount*fee)AS revenue FROM course WHERE datediff(?, time_created) <= ? AND NOT status IN ("new", "canceled")';

        }
        else
            $revenue_query = 'SELECT SUM(cur_amount*fee) AS revenue FROM course WHERE NOT status IN ("new", "canceled")';
        $stmt = $this->_db->prepare($revenue_query);
        if (isset($diff))
            $revenue_result = $stmt->execute([$now, $diff]);    
        else 
            $revenue_result =  $stmt->execute();
        if ($revenue_result){
            $revenue = $stmt->fetch(PDO::FETCH_ASSOC)['revenue'];
            $res['revenue'] = $revenue;
            
            $course_query = 'SELECT COUNT(*) AS amount FROM course WHERE NOT status = "canceled"';
            $course_result = $this->_db->query($course_query);
            if ($course_result){
                $amount = $course_result->fetch(PDO::FETCH_ASSOC)['amount'];
                $res['num_courses'] = $amount;
            }
            else 
                return false; 
            
            
        }
        else 
            return false;
        return $res;
        
    }

    public function create($data){
        $course_data = $data['course'];
        $course_name = $course_data['name'];
        $img = $course_data['img'];
        $img_exploded = explode(';', $img);
        $img_format = explode('/',$img_exploded[0])[1];
        $course_data['img'] = rand(1000, 1000000) . "-" . $course_name . '.' . $img_format;
        // echo $course_data['img'] . PHP_EOL;
        base64_to_jpeg($img, UPLOAD . 'courses/'. $course_data['img']);
        $schedule_data = $data['schedule'];
        $this->setAtrributes($course_data);
        
        $result = $this->save();
        if (!$result)
            return false;

        $course_id = $this->_db->getLastId();
        $child_query = 'INSERT INTO schedule (course_id, weekday_id, time_id) VALUES (?, ?, ?)';
        foreach($schedule_data as $schedule){
            $weekday_id = $schedule['weekday_id'];
            $time_id  = $schedule['time_id'];
            $stmt = $this->_db->prepare($child_query);
            $result = $stmt->execute([$course_id, $weekday_id, $time_id]);
            if (!$result)
                return false;
        }
        return true;

    }
    

    


}