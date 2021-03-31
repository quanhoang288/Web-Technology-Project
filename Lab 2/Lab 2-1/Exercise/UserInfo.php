
<html>
<head><title>Personal Info</title>
    <style>
        #general{
            display: flex;
            margin-bottom: 2rem;
        }
        #general #general-info{
            margin-left: 2rem;
        }
        
        table {
            line-height: 2rem;
            width: 100%;
            border-collapse: collapse;
        }
        table td {
        border: 1px solid gray; 
       
        }
        /* table tr:first-child td {
        border-top: 0;
        }
        table tr td:first-child {
        border-left: 0;
        }
        table tr:last-child td {
        border-bottom: 0;
        }
        table tr td:last-child {
        border-right: 0;
        } */
    </style>
</head>
<body>

<?php
    $name = $_POST["name"];
    $dob = $_POST["dob"];
    $class = $_POST["class"];
    $uni = $_POST["uni"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
    $profile = $_FILES["profile"];
    $filepath = "./" . $_FILES["profile"]["name"];
    move_uploaded_file($_FILES["profile"]["tmp_name"], $filepath);
    // if (move_uploaded_file($_FILES["profile"]["tmp_name"], $filepath)){
    //     {
    //         echo "<img src=".$filepath." height=100 width=100 />";
    //     } 
    // }
    
    if (isset($_POST["hobbies"])){
        $hobbies = $_POST["hobbies"];
    }
    if (isset($_POST["skills"])){
        $skills = $_POST["skills"];
    }
    
    
    // echo "Hello, $name <br>";
    // echo "You are studying at $class, $uni <br>";
    // echo "Email address: $email <br>";
    // echo "Address: $address <br>";
    // echo "Phone numbers: $phone <br>";
    
    // if (!empty($hobbies)){
    //     echo "Hobbies: <br>";
    //     // echo "<ol>";
    //     foreach($hobbies as $key=>$value){
    //         echo $key + 1 . '. ' . $value;
    //         echo "<br>";
    //         // echo strlen($value);
                
    //         // if ($value != ''){
                
    //         // }
            
    //     }
    //     // echo "</ol> <br>";
    // }
    // if (!empty($skills)){
    //     echo "Skills: <br>";
    //     echo "<ol>";
    //     foreach($skills as $value){
    //         echo "<li> $value <li>";
    //     }
    //     echo "</ol> <br>";
    // }

    
?>

    <div id="general">
        <div id="profile">
            <img src="<?php echo $filepath?>" height=100 width=100 />
        </div>
        <div id="general-info">
            <h2><?php echo $name?></h2>
            <h4><?php echo $class . ' - ' .$uni?></h4>
        </div>

    </div>
    <div id="detail">
        <table>
            <tr>
                <td>Birthday</td>
                <td><?php echo date('d/m/Y', strtotime($dob)) ?></td>
            </tr>
            <tr>
                <td>Address</td>
                <td><?php echo $address ?></td>
            </tr>
            <tr>
                <td>Email</td>
                <td><?php echo $email?></td>
            </tr>
            <tr>
                <td>Phone number</td>
                <td><?php echo $phone?></td>
            </tr>
            <div>
            <?php
                if (!empty($skills)){
                    echo "<tr>";
                    // echo "<td rowspan=\"" . count($skills) . "\">Skills</td>";
                    // echo "<td rowspan=\"" . count($skills) . "\">";
                    echo "<td>Skills</td>";
                    echo "<td>";
                    foreach($skills as $key=>$value){
                        echo $key + 1 . '. ' . $value;
                        echo "<br>";
                    }
                    echo "</td> </tr>";
                }
            ?>
            </div>
            <div>
            <?php
                if (!empty($hobbies)){
                    echo "<tr>";
                    // echo "<td rowspan=\"" . count($hobbies) . "\">Hobbies</td>";
                    // echo "<td rowspan=\"" . count($hobbies) . "\">";
                    echo "<td>Hobbies</td>";
                    echo "<td>";
                    foreach($hobbies as $key=>$value){
                        echo $key + 1 . '. ' . $value;
                        echo "<br>";
                    }
                    echo "</td> </tr>";
                }
            ?>
            </div>
        </table>
    </div>

</body>
</html>
