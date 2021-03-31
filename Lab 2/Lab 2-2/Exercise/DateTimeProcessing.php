<html>
    <head>
        <title>Date Time Processing</title>
        
    </head>
</html>
<body>
    <?php
        $display = false;
        if (array_key_exists("name", $_GET)){
            $name = $_GET["name"];
            $date = $_GET["date"];
            $time = $_GET["time"];
            $display = true;
        }
        else{
            $name = "";
            $date = "";
            $time = "";
        }
    ?>
    <div style="display: flex; justify-content: center; margin-top:auto; margin-bottom: auto;">
    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="GET">
        
        <table class="input" style="line-height: 3rem;">
            <tr>
                <td>Your name</td>
                <td><input type="text" name="name" id="name" value = <?php echo "\"$name\"" ?>  required></td>
            </tr>
            <tr>
                <td>Date</td>
                <td><input type="date" name="date" id="date" required value = <?php echo $date?> required ></td>
            </tr>
            <tr>
                <td>Time</td>
                <td><input type="time" name="time" step="1" id="time" required value = <?php echo $time?> required ></td>
            </tr>
            <tr>
                <td align="left"><input type="submit" value="Submit"></td>
                <td align="left"><input type="reset" value="Reset"></td>
            </tr>
        </table>
        <br>
        <br>
   

        
        <?php
            if ($display){
                echo "<hr>";
                $timeIn12 = date('h:i:s A', strtotime($time));
                $days = cal_days_in_month(CAL_GREGORIAN, intval(date('m', strtotime($date))), intval(date('Y', strtotime($date))));
                echo "Hi $name! <br>". "You have chosen to have an appointment on $time, $date <br> <br>";

                echo "More information <br><br>" . "In 12 hours, the time and date is $timeIn12, $date <br>";
                echo "This month has $days days!";
            }
            // if (array_key_exists("name", $_GET)){
            //     // $name = $_GET["name"];
            //     // $date = $_GET["date"];
            //     // $time = $_GET["time"];
            //     $timeIn12 = date('h:i A', strtotime($time));
            //     $days = cal_days_in_month(CAL_GREGORIAN, intval(date('m', strtotime($date))), intval(date('Y', strtotime($date))));
            //     echo "Hi $name! <br>". "You have chosen to have an appointment on $time, $date <br> <br>";

            //     echo "More information <br><br>" . "In 12 hours, the time and date is $timeIn12, $date <br>";
            //     echo "This month has $days days!";
            // }
        ?>
        
    </form>
    </div>
</body>