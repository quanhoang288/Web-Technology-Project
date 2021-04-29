<html>
<head>
    <style>
        a{
            text-decoration: none;
            
            color: black;
        }
        a:hover{
            color: blue;
        }
        #content{
            width: 15%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            background-color: antiquewhite;
        }
        #content a{
            width: 100%;
            
            
        }

    </style>
    
</head>

<body>
    <h1><a href="<?php echo $_SERVER['PHP_SELF']?>">Business Management</a></h1>
    <div id="content">
        <a href="admin.php">Add a new category</a>
        <br>
        <a href="registration.php">Add a new business</a>
        <br>
        <a href="listing.php">Show all business information</a>
    </div>

</body>
</html>