<html>
<head>
  <title>Search Product</title>
</head>
<body>
  <p style="color: blue; font-size: 20px;" name = "label">Products DATA<p>
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
      else{
        $SQL_Search = " SELECT * FROM $table_name 
                        WHERE Product_desc = ".'"'.$Product_desc.'"'." ";
        echo "The Query is: "."<i>". $SQL_Search."</i>" ;

        $result = mysqli_query($connect, $SQL_Search);
        if($result){
          $count = $result-> field_count;
          $name = $result->fetch_fields();
          
          // echo $count;
          echo "<table border=1 cellspacing=0 cellpading=30>";
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