<html>
<head>
<style >
    form {
  margin-left:700px;
  width:500px
}
input {
  margin-bottom:3px;
  padding:10px;
  width: 100%;
  border:1px solid #CCC
}
button {
  padding:10px
  
}






</style>
</head>
<body>
<h1>
Business Registration
</h1>
<label>
  click on one or control click on multiple categories
</label>

<form id='register-form' action="<?php echo $_SERVER['PHP_SELF']?>" method='post'>
  <input type="text" name="Business_name" placeholder="Business name" required>
  <input type="text" name="Address" placeholder="Address" required>
  <input type="text" name="City" placeholder="City" required>
  <input type="telephone" name="telephone"placeholder="telephone" required>
  <input type="text" name="URL"placeholder="URL" required>
  <button type='submit' >Add Business</button>
  
</form>

<?php
if(isset($_POST['Business_name'])){
   $Business_name = $_POST['Business_name'];}
if(isset($_POST['Address'])) {
   $Address = $_POST['Address'];}
if(isset($_POST['City'])){
   $City = $_POST['City'];}
if(isset($_POST['telephone'])){
   $telephone = $_POST['telephone'];}
if(isset($_POST['URL'])){
   $URL = $_POST['URL'];}
    echo "abc";
   
if(isset($_POST['Business_name'])){
  $connect = new mysqli("localhost","root","","business_service");
   $query = "INSERT INTO business(Name, Address, City, Telephone, URL)
              VALUES ('".$Business_name."','".$Address."','".$City."','".$telephone."','".$URL."')";
    echo $query;
    mysqli_query($connect, $query);
    $connect->close();
}
echo "abc";
 ?>

</body>
</html>