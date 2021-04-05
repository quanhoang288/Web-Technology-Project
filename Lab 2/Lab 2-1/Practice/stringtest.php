<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>String_Test</title>
    </head>
    <body>

        <?php
            // php print 
            print('Scalas<br/>'); 
            
        ?>
       <?php
            $foo = true; if ($foo) echo "It is TRUE! <br /> \n";
            $txt='1234'; echo "$txt <br /> \n";
            $a = 1234; echo "$a <br /> \n";
            $a = -123; 
            echo "$a <br /> \n";
            $a = 1.234; 
            echo "$a <br /> \n";
            $a = 1.2e3; 
            echo "$a <br /> \n";
            $a = 7E-10; 
            echo "$a <br /> \n";
            echo 'Arnold once said: "I\'ll be back"', "<br /> \n";
            $beer = 'Heineken'; 
            echo "$beer's taste is great <br /> \n";
            $str = <<<EOD
            Example of string
            spanning multiple lines
            using “heredoc” syntax.
            EOD;
            echo $str;
        ?>  


        

        <?php
            // php print 
            print('<hr/>');
            print('Arrays<br/>');
        ?>                
        <?php
            $arr = array(5 => 1, 12 => 2);
            foreach ($arr as $key => $value) { echo $key, '=>',                            
                                                    $value;  }
            $arr[] = 56;    // the same as $arr[13] = 56;
            $arr["x"] = 42; // adds a new element
            unset($arr[5]); // removes the element
            unset($arr);    // deletes the whole array
            $a = array(1 => 'one', 2 => 'two', 3 => 'three');
            unset($a[2]);
            $b = array_values($a);
        ?>
        
        
        
        
        
        <?php
            // php print 
            print('<hr/>');
            print('Conditionals: if else<br/>');
        ?>       
        <?php
            $d=date("D");
            echo $d, "<br/>";
            if ($d=="Fri")
                 echo "Have a nice weekend! <br/>"; 
            else
                 echo "Have a nice day! <br/>"; 

            $x=10;
            if ($x==10)
            {
                 echo "Hello<br />"; 
                 echo "Good morning<br />";
            }
        ?>



        
        <?php
            // php print 
            print('<hr/>');
            print('Conditionals: switch<br/>');
        ?> 
        <?php
            $x = rand(1,5);  // random integer
            echo "x = $x <br/><br/>";
            switch ($x)
            {
            case 1:
              echo "Number 1";
              break;
            case 2:
              echo "Number 2";
              break;
            case 3:
              echo "Number 3";
              break;
            default:
              echo "No number between 1 and 3";
              break;
            }
        ?>

        
        
        <?php
            // php print 
            print('<hr/>');
            print('Looping: while and do_while<br/>');
        ?>
        <?php 
            $i=0;
            do
            {
              $i++;
              echo "The number is $i <br />";
            }
            while($i <= 10);

            $i=1;
            while($i <= 5)
            {
              echo "The number is $i <br />";
              $i++;
            }
        ?>




        <?php
            // php print 
            print('<hr/>');
            print('Looping: for and foreach<br/>');
        ?>
        <?php
            for ($i=1; $i<=5; $i++)
            {
            echo "Hello World!<br />";
            }
            
            
            $a_array = array(1, 2, 3, 4);
            foreach ($a_array as $value) 
            {
               $value = $value * 2;
               echo "$value <br/> \n";
            }
        ?>

        
        
        
        
        
        <?php
            // php print 
            print("<hr/>");
            print('User Defined Functions<br/>');
        ?>
        <?php
        function small_numbers()
        {
           return array (0, 1, 2);
        }
        list ($zero, $one, $two) = small_numbers();
        echo $zero, $one, $two;
        echo "<br/>"
        ?>


        
        <?php
            // php print 
            print("<hr/>");
            print('Getting Time and Date<br/>');
        ?>
        <?php
        $nextWeek = time() + (7 * 24 * 60 * 60);
                           // 7 days; 24 hours; 60 mins; 60secs
        echo 'Now:      '. date('Y-m-d') ."\n";
        echo 'Next Week: '. date('Y-m-d', $nextWeek) ."\n";
        ?>   




        <?php
            // php print 
            print('<hr/>');
            print('PHP Information:<br/>')
        ?>
        <?php
        // Show all PHP information
            phpinfo();
        ?>
        <?php
        // Show only the general information
            phpinfo(INFO_GENERAL);
        ?>




        <?php
            // php print 
            print('<hr/>');
            print('Server Variables:<br/>')
        ?>
        <?php 
            echo "<br/><br/><br/>";
            echo "<h2>All information</h2>";
            foreach ($_SERVER as $key => $value)
              {
                echo $key . " = " . $value . "<br/>";
              }
        ?>
        
       




    </body>
</html>
