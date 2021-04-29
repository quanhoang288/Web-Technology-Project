
<html >
<head>
  <title>Insert</title>
</head>
  <body>
    <?php
      $server = 'localhost';
      $user = 'root';
      $pass = '';

      $mydb = 'mydatabase';
      $table_name = 'Products';

      $Product_desc = $_POST["Product_desc"];
      $Cost = $_POST["Cost"];
      $Weight = $_POST["Weight"];
      $Numb = $_POST["Numb"];

      $connect = mysqli_connect($server, $user, $pass, $mydb);
      if (!$connect) {
        die ("Cannot connect to $server using $user");
      }
      else {
        $SQL_insert_table = "INSERT INTO $table_name 
                                          VALUES ( NULL ,".'"'.$Product_desc.'"'.", $Cost, $Weight, $Numb)";

        if (mysqli_query($connect, $SQL_insert_table)) {
          print "The Query is " . $SQL_insert_table;
          print "\nInsert into was successful";
        } else {
          print "Error: " . $SQL_insert_table . "<br>" . mysqli_error($connect);
        }

        mysqli_close($connect);
      }

    ?>
  </body>
</html>