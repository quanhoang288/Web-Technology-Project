<html>
<head>
  <title>Display data from Products</title>
</head>
<body>
  <p style="color: blue; font-size: 20px;">UPDATE Results for Table Products<p>
  <?php
    $server = 'localhost';
    $user = 'root';
    $pass = '';

    $mydb = 'mydatabase';
    $table_name = 'Products';
    $Product_desc = $_POST["Product_desc"];

    $connect = mysqli_connect($server, $user, $pass, $mydb);
      if (!$connect) {
        die ("Cannot connect to $server using $user");
      }
      else {

        $SQL_update = "UPDATE $table_name SET Numb = Numb - 1
                        WHERE (Product_desc = ".'"'.$Product_desc.'"'.")";

        if (mysqli_query($connect, $SQL_update)) {
          print "The Query is " . $SQL_update;
        } else {
          print "Error: " . $SQL_update . "<br>" . mysqli_error($connect);
        }

        $SQL_Display = "SELECT * FROM $table_name";
        $result = mysqli_query($connect, $SQL_Display);

        if($result){
          $count = $result-> field_count;
          $name = $result->fetch_fields();
          
          // echo $count;
          echo "<table border=1 cellspacing=0 cellpading=0>";
          foreach ($name as $val) {
            echo "<th> $val->name </th>
            ";
          }

          while($row = $result->fetch_row()){
            echo "<tr>";
            for($i = 0; $i<$count ; $i++){
              
              echo "<td> $row[$i] </td>
              ";
              
            }
            echo "</tr>";
          }
          echo "</table>";
        }
        else{
          print "Error: " . $SQL_Display . "<br>" . mysqli_error($connect);
        }
        mysqli_close($connect);
      }
  ?>
</body>
</html>