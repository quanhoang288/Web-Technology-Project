<html>
    <head>
    </head>
    <body>
    <h1>
    Category Adminstration
    </h1>
    <div class="container-fluid">
    <table class="table " style="width: 100%;">
    <tr>
       <th>CatID</th>
       <th>Title</th>
       <th>Decription</th>
    </tr>
    <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
    <input type="text" name="CatID" required>
    <input type="text" name="Title" required>
    <input type="text" name="Description" required>
    <button type="submit">Add</button>   
    </form>
    </table>
    </div>
    <?php
// if(isset($_POST['CatID'])){
//    $CatID = $_POST['CatID'];}
// if(isset($_POST['Title'])) {
//    $Title = $_POST['Title'];}
// if(isset($_POST['Description'])){
//    $Description = $_POST['Description'];}

   
// if(isset($_POST['CatID'])){
   $connect = new mysqli("localhost","root","","business_service");
//    $query = "INSERT INTO categories(CategoryID, Title, Description)
//               VALUES ('".$CatID."','".$Title."','".$Description."')";
    
    
//     mysqli_query($connect, $query);
//     $connect->close();
    $query = "SELECT* FROM categories(CategoryID, Title, Description)";
    $result = $connect->query($query);
    
    if($result->num_rows >0){
        while($row = $result->fetch_assoc()){
        echo '
            <tr>
                <th>'.$row['CategoryID'].'</th>
                <th>'.$row['Title'].'</th>
                <th>'.$row['Description'].'</th>
            </tr>
        ';
        }
    }
    

    
    

    
 ?>
    </body>

</html>