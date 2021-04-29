<html>

<head>
	<style>
		form {
			width: 100%;
			height: 60%;
	

		}

		input {
			float: right;
			margin-bottom: 1rem;
			padding: 10px;
			width: 80%;
			border: 1px solid #CCC
		}

		button {
			margin-top: 1rem;
			padding: 5px
		}

		.content{
			display: flex;
			justify-content: space-between;
			
		}
		.content .form{
			
			width: 40%;
	
		}
		.content .form .form-item{
			display: flex;
			justify-content: space-between;
		}
		.content .form .form-item label{
			margin-top: 0.7rem;
		}

		.content .info label{
			margin-top: 5rem;
		}
		.content .info select{
			margin-top: 8rem;
			width: 100%;
	
			

		}
	</style>
</head>

<body>
	<?php
	
	if (isset($_POST['Business_name'])) {

		$business_name = $_POST['Business_name'];
		$address = $_POST['Address'];
		$city = $_POST['City'];
		$telephone = $_POST['telephone'];
		$url = $_POST['URL'];
		$selectedCategories = $_POST['categories'];
		// var_dump($categories);
		$connect = new mysqli("localhost", "root", "", "business_service");
		$query_business = "INSERT INTO business(Name, Address, City, Telephone, URL)
			VALUES ('" . $business_name . "','" . $address . "','" . $city . "','" . $telephone . "','" . $url . "')";
		
		mysqli_query($connect, $query_business);
		$businessID = $connect->insert_id; 
		foreach($selectedCategories as $category){
			$query_category = 'SELECT CategoryID FROM categories WHERE Title = ' . '"'. mysqli_escape_string($connect,  $category) . '"';
			// echo $query_category . ' </br> ';
			$result = mysqli_query($connect, $query_category);
			$categoryID = $result->fetch_row()[0];
			$query_join = 'INSERT INTO biz_categories VALUES(' . $businessID . ', ' . $categoryID . ')';
			// echo $query_join . ' </br> ';
			$result = mysqli_query($connect, $query_join);

		}
		
		$connect->close();
	}
	else{

		$business_name = '';
		$address = '';
		$city = '';
		$telephone = '';
		$url = '';
		$selectedCategories = array();
	}

	?>
	<h1>
		Business Registration
	</h1>
	<a href="index.php">Back to home</a>
	<?php 
		$query = "SELECT Title FROM categories";
		$connect = new mysqli("localhost", "root", "", "business_service");
		$categories = array();
		$result = mysqli_query($connect, $query);
		if ($result){
			while ($row = $result->fetch_row()){
				array_push($categories, $row[0]);
				
			}
		}
		$connect->close();
	?>
	<form id='register-form' action="registration.php" method='post'>
		<div class="content">
			<div class="info">
				<label>Business categories</label>
				<select name="categories[]" size="10" multiple required>
					<?php 
						foreach ($categories as $category){
							if (in_array($category, $selectedCategories)){
								echo '<option value ="' . $category .'" selected>' . $category. ' </option>';
							}
							else{
								echo '<option value ="' . $category .'">' . $category. ' </option>';
							}
							
						}
					?>
					<!-- <option value="Merceders" se> Merceders </option>
					<option value="BMW"> BMW </option>
					<option value="Jaguar"> Jaguar </option>
					<option value="Lamborghini"> Lamborghini </option>
					<option value="Ferrari"> Ferrari </option>
					<option value="Ford"> Ford </option> -->
				</select>
			</div>
			<div class="form">
				<div class="form-item">
					<label for="Business_name">Business name</label>
					<input type="text" name="Business_name" placeholder="Business name" value="<?php echo $business_name?>" required>
				</div>

		
				<div class="form-item">
					<label for="Address">Address</label>
					<input type="text" name="Address" placeholder="Address" required value="<?php echo $address ?>" >
				</div>
				
		
				<div class="form-item">
					<label for="City">City</label>
					<input type="text" name="City" placeholder="City" required value="<?php echo $city?>">
				</div>
				
				<div class="form-item">
					<label for="telephone">Telephone</label>
					<input type="telephone" name="telephone" placeholder="telephone" required value="<?php echo $telephone?>">
				</div>

				<div class="form-item">
					<label for="URL">URL</label>
					<input type="text" name="URL" placeholder="URL" required value="<?php echo $url?>"> 
				</div>
                <a href="registration.php">Add Another Business</a>

			
			</div>
			
		</div>


		
	</form>







</body>

</html>