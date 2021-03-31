<html><head><title>Square and Cube</title></head></html>
<body>
    <h2 style="color: blue; text-align: center;">Generate Square and Cube value</h2>
    <div style="display: flex; justify-content: center;">

    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="get">
    
        <?php 
            if (array_key_exists("start", $_GET)){
                $start = $_GET["start"];
                $end = $_GET["end"];
            }
            else {
                $start = 0; $end = 0;
            }
        ?>
        <table>
            <tr>
                <td>Select start number: </td>
                <td>
                    <select name="start" >
                        <?php
                            for ($i = 0; $i <= 10; $i++){
                                if ($start == $i){
                                    print("<option selected>$i</option>");
                                }
                                else {
                                    print("<option>$i</option>");
                                }
                                
                            }
                        ?>
                    </select>
                </td>
            </tr>
            
            <tr>
                <td>Select end number: </td>
                <td>
                    <select name="end" >
                        <?php
                            for ($i = 0; $i <= 20; $i++){
                                if ($end == $i){
                                    print("<option selected>$i</option>");
                                }
                                else{
                                    print("<option>$i</option>");
                                }
                                
                            }
                        ?>
                    </select>
                </td>
            </tr>
            
            <tr>
                <td align="center"><input type="submit" value="Submit"></td>
                <td align="left"><input type="reset" value="Reset"></td>
            </tr>
        </table>
        <table>
            <tr><th>Number</th> <th>Square</th> <th>Cube</th></tr>
            <?php
                $i = $start;
                while ($i <= $end){
                    $square = $i * $i;
                    $cube = $square * $i;
                    print "<tr><td>$i</td> <td>$square</td> <td>$cube</td></tr>";
                    $i = $i + 1;
                }
                // if (array_key_exists("start", $_GET)){
                //     $start = $_GET["start"];
                //     $end = $_GET["end"];
                    
                // }
            ?> 
        </table>
    </form>
    </div>
</body>