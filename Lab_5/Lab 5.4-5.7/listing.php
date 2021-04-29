<html>
    <head>
        <title>Business Listing</title>
        <style>
            #content{
                display: flex;
                justify-content: space-between;
            }
            #info{
                margin-right: 2rem;
               
            }
            #info table{
                
                border-collapse: collapse;
            }
            #info th, td{
                border: 1px solid;
                
            }
            p{
                margin-right: 15rem;
            }
        </style>
    </head>
    <body>
        <?php
            DEFINE("BASE_PATH", "/Web-Technology-Project/Lab_5/Lab%205.4-5.7/listing.php");
            $query = "SELECT Title FROM categories";
        
            $connect = new mysqli("localhost", "root", "", "business_service");
            $categories = array();
            $business_fields = array();
            $business_list = array();
            $result = mysqli_query($connect, $query);
            if ($result){
                while ($row = $result->fetch_row()){
                    array_push($categories, $row[0]);
                    
                }
            }
            
            $categoryQuery = str_replace('/Web-Technology-Project/Lab_5/Lab%205.4-5.7/listing.php/cat_id=', '', $_SERVER['REQUEST_URI']);
            
            $query = 'SELECT CategoryID FROM categories WHERE Title="' . $categoryQuery . '"';
            // echo $query . '</br>';
            $result = mysqli_query($connect, $query);

            if ($result){
         
                while($row = $result->fetch_row()){
                    $categoryID = $row[0];
                    $query = 'SELECT * FROM business JOIN biz_categories ON business.BusinessID = biz_categories.BusinessID
                    AND biz_categories.CategoryID='.$categoryID;
                    // echo $query . '</br>';
                    $resultJoin = mysqli_query($connect, $query);
                    if ($resultJoin){
                        
                        $fields = $resultJoin->fetch_fields();
                        foreach($fields as $field){
                            
                            if ($field->table == 'business'){
                                // echo $field->name .'-';
                                array_push($business_fields, $field->name);
                            }
                            
                        }
                        $numFields = count($business_fields);
                        while ($rowJoin = $resultJoin->fetch_row()){
                            $tmpRow = array();
                            for($i = 0; $i < $numFields; $i++){
                                array_push($tmpRow, $rowJoin[$i]);
                            }
                            array_push($business_list, $tmpRow);
                            
                        }

                        foreach($business_fields as $field){
                            
                        }
                        // var_dump($business_list);
                    }

                }
            }

            $connect->close();
        ?>
        <a href="index.php">Back to home</a>
        <div id='content'>
        <table id="category">
            <th>Click on a category to find business listings</th>
            <?php 
                foreach($categories as $category){
                    echo '<tr><td><a href="'. BASE_PATH .'/cat_id='.$category .'">' . $category . '</a></td></tr>';
                }
            ?>


        </table>
      
        <?php if (count($business_list)) { ?>
            <div id="info">
                <table> 
                
                <?php foreach($business_fields as $field){ ?>
                <th><?php echo $field ?></th> 
                <?php }?>
            
                <?php foreach($business_list as $business) { ?>
                    <tr>
                        <?php for($i = 0; $i < $numFields; $i++){ ?>
                            <td><?php echo $business[$i] ?></td>
                        <?php } ?>
                    </tr>
                <?php } ?>
                </table>
            </div>

        <?php } else{ ?>
            <p>No business found</p>
        <?php } ?>
       
        </div>
        <script>
            
        </script>

        
    </body>
</html>