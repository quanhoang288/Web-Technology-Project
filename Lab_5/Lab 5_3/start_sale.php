<html>
<head>
  <title>Display data from Products</title>
</head>
<body>
  <?php
    $server = 'localhost';
    $user = 'root';
    $pass = '';

    $mydb = 'mydatabase';
    $table_name = 'Products';

    $connect = mysqli_connect($server, $user, $pass, $mydb);
      if (!$connect) {
        die ("Cannot connect to $server using $user");
      }
      else {
        $SQL_Display = "SELECT * FROM $table_name";
        $result = mysqli_query($connect, $SQL_Display);

        if($result){
          $count = $result-> field_count;
          $name = $result->fetch_fields();
          
          echo'
          <form ACTION = "sale.php"  method = "POST">
            <p style="color: blue; font-size: 20px;">SELECT PRODUCT WE JUST SOLD<p>';
          
          // while($row = $result->fetch_row()){
          //     echo "<input type='radio' name='contact' value='Yes'>";
          // }

          echo '
            <br>
            <input type = "submit" value="Click to submit!">
            <input type = "reset" value="reset">
          </form>';


          // echo $count;
          echo 'The Query is SELECT * FROM Products';
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