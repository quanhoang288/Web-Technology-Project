<html>
    <head>
        <title>Date Time Processing</title>
        <style>
            /* .input{
                border: 5px solid;
                margin-right: 1rem;
            } */
            input{
                width: 100%;
                max-width: 100%;
            }
            input#reset{
                width: fit-content;
            }
            input#submit{
                width: fit-content;
            }
            table {
                
                width: 100%;
                max-width: 100%;
            }
        </style>
        
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
    <div style="display: flex; justify-content: center; margin-top:6rem;">
    <form action="<?php $_SERVER['PHP_SELF'] ?>" method="GET">
        <div class="date-input">
        <table style="line-height: 3rem;">
            <tr>
                <td>Your name</td>
                <td class="input"><input type="text" name="name" id="name" value = <?php echo "\"$name\"" ?>  required></td>
            </tr>
            <tr>
                <td>Date</td>
                <td class="input"><input type="date" name="date" id="date" required value = <?php echo $date?> required ></td>
            </tr>
            <tr>
                <td>Time</td>
                <td class="input"><input type="time" name="time" step="1" id="time" required value = <?php echo $time?> required ></td>
            </tr>
            <tr>
                <td align="left"><input type="submit" value="Submit" id="submit"></td>
                <td align="left"><input type="reset" value="Reset" id="reset"></td>
            </tr>
        </table>
        </div>
        <br>
        <br>
   

        
        <?php
            if ($display){
                echo "<hr>";
                $timeIn12 = date('h:i:s A', strtotime($time));
                $days = cal_days_in_month(CAL_GREGORIAN, intval(date('m', strtotime($date))), intval(date('Y', strtotime($date))));
                $date = date('d/m/Y', strtotime($date));
                echo "Hi <b>$name</b>! <br>". "You have chosen to have an appointment on <b>$time</b>, <b>$date</b> <br> <br>";

                echo "More information <br><br>" . "In 12 hours, the time and date is <b>$timeIn12</b>, <b>$date</b> <br>";
                echo "This month has <b>$days</b> days!";
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